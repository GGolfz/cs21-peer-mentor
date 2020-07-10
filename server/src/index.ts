import { app } from './app'
const port = process.env.PORT || 3050

app.listen(port, () => {
	console.log(`Running on ${port}`)
})
