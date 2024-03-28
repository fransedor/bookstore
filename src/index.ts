import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
});