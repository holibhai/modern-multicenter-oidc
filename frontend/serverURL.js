const serverURL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-url.com'  
  : 'https://localhost:5371';          

export default serverURL;