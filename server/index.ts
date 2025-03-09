import express from 'express';
import dotenv from 'dotenv';
import openAiRequest from './openAiAPI.ts'
dotenv.config();

const app = express();
const port = 3265;

app.get('/', async (req, res) => {
  res.send("test");
});

app.post('/api/generateCaption', (req, res) => {
const {prompt, url} = req.body
})

app.get('/request', async (req, res) => {
  const response = await openAiRequest("Ecris en anglais", "");
  res.send(response);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});