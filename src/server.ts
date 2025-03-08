// const app = require ('./app')
// const http = require('http')
// const  {port} = require ('./config/index')



import app from "./app"
import http from 'http'
import config from './config/index'

const server = http.createServer(app)




server.listen(config.port,()=>{
    console.log(`server Run in: ${config.port}`)
});