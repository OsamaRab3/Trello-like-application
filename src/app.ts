// const express = require('express');
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import errorHandlers from './config/init'

const app = express();
// refactor: migrate codebase from JavaScript to TypeScript 

app.use(helmet());
app.use(cors());
app.use(express.json());

const userRouter = require('./api/routes/user')
const boardRouter = require('./api/routes/board')
app.use('/api/auth',userRouter)
app.use('/api/board',boardRouter)

app.all('*',errorHandlers.NotFound)
app.use(errorHandlers.globalError);


// ------------------------------------------



export default  app; 
