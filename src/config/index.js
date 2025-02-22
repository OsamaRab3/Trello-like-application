
require('dotenv').config();

module.exports = {
  port:process.env.PORT,
  DATABASE_URL:process.env.DATABASE_URL,
  JWT_SECRET:process.env.JWT_SECRET,
  JWT_REFRESH_SECRET:process.env.JWT_REFRESH_SECRET
};