import OpenAI from "openai";
import type { ChatCompletionContentPartText } from "openai/resources/chat/completions/completions.mjs";
import dotenv from 'dotenv';


interface IResponseType {
  caption: string;
}

dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  organization: "org-kmATHO0II7YUN5oacXUQQpvG",
  project: "proj_ENvKq4O4BQUXxphvSPFdzraZ",
  apiKey: apiKey
});

export default async function openAiRequest(
  prompt = "" as String,
  img = "" as ChatCompletionContentPartText["text"]
) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                prompt +
                `. Décris ce que tu vois dans cette image. Essaie d'être précis et de détailler, peut être donne des références et le message ou l'émotion retransmise si possible. Ta réponse doit être strictement un JSON valide avec une seule clé 'caption' et sa valeur en texte. Exemple : {"caption": "Un chat noir assis sur un canapé."} sans markdown json`,
            },
            {
              type: "image_url",
              image_url: {
                url: img,
              },
            },
          ],
        },
      ],
      store: true,
      max_tokens: 300,
    });
    console.log(completion.choices[0].message);

    try {
      const responseText = completion.choices[0].message.content ?? "";
      const responseJSON = JSON.parse(responseText) as IResponseType;
      return responseJSON;
    } catch (err) {
      console.error("JSON parsing error:", err);
      return null;
    }
  } catch (err) {
    console.error(err);
    return { caption: "Aucune image n'a été détecté, l'oeil se referme..."}
  }
}
