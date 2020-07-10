import express = require('express')
import * as bodyParser from 'body-parser'
const router = express.Router()
router.use(bodyParser.json())
router.route('/').get((req:any,res:any,next:any)=>{
    res.json({'message':'api'})
})
export = router