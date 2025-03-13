import bodyParser from 'body-parser';
import cors from 'cors'; 
import dotenv from 'dotenv';
import express from 'express';
import openAiRequest from './openAiAPI.ts'

dotenv.config();

const app = express();
const port = 3265;
app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req, res) => {
  res.send("test");
});

app.post('/api/generateCaption', async (req, res) => {
const {imageUrl} = req.body
console.log(imageUrl);
const response = await openAiRequest("", imageUrl);
res.send(response);
})

// app.get('/request', async (req, res) => {
//   res.send(response);
// });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});