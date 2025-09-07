
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const config = require('../config/config');


const limiter = rateLimit({
    windowMs: config.security.rateLimitWindowMs,
    max: config.security.rateLimitMaxRequests,
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});


const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, 
    message: 'Too many authentication attempts, please try again later.',
    skipSuccessfulRequests: true
});


const sanitizeInput = (req, res, next) => {
   
    if (req.body) {
        req.body = sanitizeObject(req.body);
    }
    if (req.query) {
        req.query = sanitizeObject(req.query);
    }
    if (req.params) {
        req.params = sanitizeObject(req.params);
    }
    next();
};


const sanitizeObject = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
        if (typeof obj === 'string') {
           
            return obj
                .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/javascript:/gi, '')
                .replace(/on\w+\s*=/gi, '')
                .trim();
        }
        return obj;
    }

    const sanitized = Array.isArray(obj) ? [] : {};
    
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          
            if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
                continue;
            }
            sanitized[key] = sanitizeObject(obj[key]);
        }
    }
    
    return sanitized;
};


const csrfProtection = (req, res, next) => {
    if (req.method === 'GET') {
        return next();
    }

    const token = req.headers['x-csrf-token'] || req.body._csrf;
    const sessionToken = req.session?.csrfToken;

    if (!token || !sessionToken || token !== sessionToken) {
        return res.status(403).json({
            error: 'Invalid CSRF token',
            code: 'CSRF_VALIDATION_FAILED'
        });
    }

    next();
};


const securityHeaders = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            scriptSrc: ["'self'", "https://cdn.auth0.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", `https://${config.auth0.domain}`]
        }
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
});


const preventParamPollution = (req, res, next) => {
  
    const fieldsToClean = ['username', 'email', 'productName', 'quantity'];
    
    fieldsToClean.forEach(field => {
        if (req.query[field] && Array.isArray(req.query[field])) {
            req.query[field] = req.query[field][0];
        }
        if (req.body && req.body[field] && Array.isArray(req.body[field])) {
            req.body[field] = req.body[field][0];
        }
    });
    
    next();
};

const securityLogger = (eventType) => {
    return (req, res, next) => {
        console.log(`[SECURITY] ${eventType} - User: ${req.user?.username || 'Anonymous'} - IP: ${req.ip} - Path: ${req.path}`);
        next();
    };
};

module.exports = {
    limiter,
    authLimiter,
    sanitizeObject,
    sanitizeInput,
    csrfProtection,
    securityHeaders,
    mongoSanitize: mongoSanitize(),
    preventParamPollution,
    securityLogger
};