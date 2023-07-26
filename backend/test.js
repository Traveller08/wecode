const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  // apiKey: "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",  # vsl
  apiKey: "sk-b8AhOo76NEB8yvmJF1F6B15a86Eb47DaAc7714Ef5cAaEe14", 
  basePath : "https://chattyapi.tech/v1"
});

const openai = new OpenAIApi(configuration);

// async function generateCodeExplanation() {

//     const response = await openai.createChatCompletion({
//     model: "gpt-4",
//     messages: [
//         {
//         "role": "system",
//         "content": "You will be provided with a piece of code, and your task is to explain it in a concise way."
//         },
//         {
//         "role": "user",
//         "content": "print('Hello World')"
//         }
//     ],
//     temperature: 0,
//     max_tokens: 1024,
//     top_p: 1.0,
//     frequency_penalty: 0.0,
//     presence_penalty: 0.0,
//     });

//     console.log(response.data);
//     return response.data.choices[0].message.content

// //     const dataString = `
// // data: {"id":"chatcmpl-HnA8ajbtop8C6Y1nB7zkAfVHLd5SL","object":"chat.completion.chunk","created":1690236015,"model":"gpt-4","choices":[{"index":0,"delta":{"role":"assistant","content":""},"finish_reason":null}]}

// // ... (all other responses) ...

// // data: [DONE]
// // `;
// const dataString = response.data;

// // Split the entire data string into separate lines
// const dataLines = dataString.trim().split("\n");

// // Concatenate the "content" from each response in the order they were received
// let result = "";

// // Function to extract the "content" from each response
// function extractContent(data) {
//   if (data.choices && data.choices[0] && "content" in data.choices[0].delta) {
//     return data.choices[0].delta.content;
//   }
//   return "";
// }

// // Iterate through each line of data and extract the "content" field from each response
// for (const line of dataLines) {
//   if (line.startsWith("data:")) {
//     const data = JSON.parse(line.slice(6));
//     result += extractContent(data);
//   }
// }

// // Output the final result
// console.log(result); // Output: "This line of code prints the string 'Hello World' to the console."

// return result;

// }



async function generateCodeExplanation() {

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "user",
        "content": "Explain this code to me: print('Hello World')"
      }
    ],
    temperature: 0.5,
    max_tokens: 1000,
  });

  // console.log(response);

  // console.log(response.data.choices[0].message.content);
  return response.data.choices[0].message.content

}


generateCodeExplanation()
  .then((result) => {
    console.log("Generated code explanation:", result);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });

