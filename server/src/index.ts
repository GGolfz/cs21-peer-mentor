import { app } from './app'
const port = process.env.PORT || 3050
require('dotenv').config()

app.listen(port, () => {
	console.log(`Running on ${port}`)
})
