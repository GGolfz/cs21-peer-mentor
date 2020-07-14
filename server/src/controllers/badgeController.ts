import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import qr from 'qrcode'
import sharp from 'sharp'
import { sign } from 'crypto'

const secret = 'somesecret'

export const getQRController = async (req: Request, res: Response): Promise<void> => {
	const student_id = '62130500230'

	const signedIDToken: String = jwt.sign({ student_id }, secret, {
		algorithm: 'HS256',
		expiresIn: '5m',
	})

	const qrcode = await qr.toFile('uploads/temp.png', `${signedIDToken}`, { type: 'png' })
	// const buffer = await sharp('uploads/temp')
	// 	.resize({
	// 		height: 200,
	// 		width: 200,
	// 	})
	// 	.webp()
	// 	.toBuffer()
	// console.log(buffer)
	res.contentType('image/png')
	res.sendFile('../../uploads/temp.png')
}
