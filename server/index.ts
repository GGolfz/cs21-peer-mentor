import express = require('express')
import * as bodyParser from 'body-parser';
import * as apiRouter from './routes/apiRouter'
const app: express.Application = express()
app.use(bodyParser.json())
app.get('/',(req:any,res:any,next:any)=>{
    res.json({'message':'hi'})
})
app.use('/api', apiRouter);
app.listen(5000, function () {
    console.log('App is listening on port 5000');
});