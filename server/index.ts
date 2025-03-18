import bodyParser from 'body-parser';
import cors from 'cors'; 
import dotenv from 'dotenv';
import express from 'express';
import openAiRequest from './openAiAPI.ts'
import fileUpload from 'express-fileupload';

dotenv.config();

const app = express();
const port = 3265;
app.use(bodyParser.json({ limit: '25mb' })); 
app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));
app.use(fileUpload());
app.use(cors());

app.get('/', async (req, res) => {
  res.send("Server is up and running");
});

app.post('/api/generateCaption', async (req, res) => {
const {sentImage} = req.body
const response = await openAiRequest("", sentImage);
res.send(response);
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});