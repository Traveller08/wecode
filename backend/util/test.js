import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  // apiKey: "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",  // vatsal ==> gpt-4
  apiKey : "sk-2dwBDkyyjE6Srrsu2277B52b71Ba4365B58cB67aBf69006d", // free ==> gpt-3.5-turbo
  basePath : "https://chattyapi.tech/v1"
});

const openai = new OpenAIApi(configuration);

async function generateCodeExplanation( content ) {

  const response = await openai.createChatCompletion({
    // model: "gpt-4",
    model : "gpt-3.5-turbo",
    messages: [
      {
        "role": "user",
        // "content": "Explain this code to me: print('Hello World')"
        "content": content
      }
    ],
    temperature: 0.5,
    max_tokens: 1005,
  });

  // console.log(response);

  // console.log(response.data.choices[0].message.content);
  return response.data.choices[0].message.content

}

// generateCodeExplanation()
//   .then((result) => {
//     console.log("Generated code explanation:", result);
//   })
//   .catch((error) => {
//     console.error("An error occurred:", error);
//   });

export {
  generateCodeExplanation
}

