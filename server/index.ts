import express from 'express';
import dotenv from 'dotenv';
import openAiRequest from './openAiAPI.ts'
dotenv.config();

const app = express();
const port = 3265;

app.get('/', async (req, res) => {
  res.send("test");
});

app.get('/request', async (req, res) => {
  const response = await openAiRequest("Ecris en anglais", "https://cdn11.bigcommerce.com/s-sdhub7he5o/images/stencil/1280x1280/products/1596/5390/item_image04__67133.1673460026.jpg?c=1");
  res.send(response);
});
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);

});