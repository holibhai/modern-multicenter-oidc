
const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');
const config = require('../config/config');
const ISSUER=process.env.ASGARDEO_OIDC_ISSUER;
const AUDIENCE=process.env.ASGARDEO_AUDIENCE;
const jwksClient = jwksRsa({
    jwksUri: `https://${ISSUER}/.well-known/jwks.json`,
    cache: true,
    cacheMaxEntries: 5,
    cacheMaxAge: 600000 
});


const getKey = (header, callback) => {
    jwksClient.getSigningKey(header.kid, (err, key) => {
        if (err) {
            return callback(err);
        }
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
};


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ 
            error: 'No authorization header provided',
            code: 'NO_AUTH_HEADER' 
        });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ 
            error: 'No token provided',
            code: 'NO_TOKEN' 
        });
    }

    const options = {
        audience: AUDIENCE,
        issuer: ISSUER,
        algorithms: config.security.jwtAlgorithms
    };

    jwt.verify(token, getKey, options, (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err);
            return res.status(401).json({ 
                error: 'Invalid token',
                code: 'INVALID_TOKEN',
                details: err.message 
            });
        }

        req.user = {
            id: decoded.sub,
            username: decoded.preferred_username || decoded.nickname || decoded.email,
            email: decoded.email,
            name: decoded.name,
            permissions: decoded.permissions || [],
            scope: decoded.scope || ''
        };

        next();
    });
};

const checkPermission = (permission) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ 
                error: 'User not authenticated',
                code: 'NOT_AUTHENTICATED' 
            });
        }

        const hasPermission = req.user.permissions.includes(permission) ||
                            req.user.scope.includes(permission);

        if (!hasPermission) {
            return res.status(403).json({ 
                error: 'Insufficient permissions',
                code: 'FORBIDDEN',
                required: permission 
            });
        }

        next();
    };
};

const userRateLimit = new Map();

const perUserRateLimit = (maxRequests = 50, windowMs = 60000) => {
    return (req, res, next) => {
        if (!req.user) {
            return next();
        }

        const userId = req.user.id;
        const now = Date.now();
        
        if (!userRateLimit.has(userId)) {
            userRateLimit.set(userId, { count: 1, resetTime: now + windowMs });
            return next();
        }

        const userLimit = userRateLimit.get(userId);
        
        if (now > userLimit.resetTime) {
            userLimit.count = 1;
            userLimit.resetTime = now + windowMs;
            return next();
        }

        if (userLimit.count >= maxRequests) {
            return res.status(429).json({
                error: 'Too many requests',
                code: 'RATE_LIMIT_EXCEEDED',
                retryAfter: Math.ceil((userLimit.resetTime - now) / 1000)
            });
        }

        userLimit.count++;
        next();
    };
};

module.exports = {
    verifyToken,
    checkPermission,
    perUserRateLimit
};