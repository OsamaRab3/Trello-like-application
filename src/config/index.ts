
import * as dotenv from 'dotenv'
dotenv.config();

export default {
  port: Number(process.env.PORT) || 8080 ,
  DATABASE_URL:process.env.DATABASE_URL as string,
  JWT_SECRET:process.env.JWT_SECRET as string,
  JWT_REFRESH_SECRET:process.env.JWT_REFRESH_SECRET  as string
}
