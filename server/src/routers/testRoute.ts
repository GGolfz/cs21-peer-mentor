import { Router, Request, Response } from 'express'
import { User  } from '../models/user'
export const testRouter = Router()

testRouter.get('/test', async (req:Request, res: Response) => {
	res.send({
		hey: 'Nice try :)',
		please: `Don't hack me please`
	})
})

testRouter.get('/leaderboard', async (req: Request, res: Response) => {
	const users = await User.find({})
	let temp:Array<any> = [] 
	await users.forEach(async (us:any)=>{
		await temp.push({name:us.name,display_name:us.display_name,profile_img:us.profile_img,bio:us.bio,badge:us.badges.length})
	})
	temp = await temp.sort((a,b)=> b.badge - a.badge)
	temp = await temp.slice(0,5)
	res.send({temp})
})
