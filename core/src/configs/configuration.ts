export default () => ({
  NODE_ENV:process.env.NODE_ENV,
  port: parseInt(process.env.PORT) || 4000,
  mongoUrl: process.env.MONGODB_URI,
});
