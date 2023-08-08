import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey : process.env.GPT_API_KEY, 
  basePath : process.env.GPT_BASE_PATH
});

const openai = new OpenAIApi(configuration);

async function generateCodeExplanation( content ) {

  const response = await openai.createChatCompletion({
    // model: "gpt-4",
    model : "gpt-3.5-turbo",
    messages: [
      {
        "role": "user",
        "content": content
      }
    ],
    temperature: 0.5,
    max_tokens: 1005,
  });

  return response.data.choices[0].message.content
}

export {
  generateCodeExplanation
}

