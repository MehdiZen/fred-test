import OpenAI from "openai";
const openai = new OpenAI({
    organization: "org-kmATHO0II7YUN5oacXUQQpvG",
    project: "proj_ENvKq4O4BQUXxphvSPFdzraZ",
});

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages:[
        {
          "role": "user",
          "content": [
            {"type": "text", "text": "Qu'est-ce qu'il y a dans cette image? et essaie de deviner le pays"},
            {
              "type": "image_url",
              "image_url": {
                "url": "https://ihe-delft-ihe-website-production.s3.eu-central-1.amazonaws.com/s3fs-public/styles/530x530/public/2022-11/Sea%20level%20rise%20Vietnam.jpg",
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
console.log(completion.usage)
