import OpenAI from "openai";
import type { ChatCompletionContentPartText } from "openai/resources/chat/completions/completions.mjs";
const openai = new OpenAI({
    organization: "org-kmATHO0II7YUN5oacXUQQpvG",
    project: "proj_ENvKq4O4BQUXxphvSPFdzraZ",
});

export default async function openAiRequest(prompt = "" as String , img = "https://ihe-delft-ihe-website-production.s3.eu-central-1.amazonaws.com/s3fs-public/styles/530x530/public/2022-11/Sea%20level%20rise%20Vietnam.jpg" as ChatCompletionContentPartText["text"] ){

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages:[
      {
        "role": "user",
        "content": [
          {"type": "text", "text": prompt + ". Décris ce que tu vois dans cette image?"},
          {
            "type": "image_url",
            "image_url": {
              "url": img,
            },
          },
        ],
      }
    ],
    store: true,
    max_tokens: 300,    
  },
);
console.log(completion.choices[0].message.content);
// console.log(completion.usage)
return completion.choices[0].message.content;
}

// test();
// exports.completion = test;
// module.exports={completion}