const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "sk-NlJknUIKrI3NVGDRDb19C37f289441E4982fDa6dEaD3FbC0",
  basePath : "https://chattyapi.tech/v1"
});

const openai = new OpenAIApi(configuration);

async function generateCodeExplanation() {

    const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
        {
        "role": "system",
        "content": "You will be provided with a piece of code, and your task is to explain it in a concise way."
        },
        {
        "role": "user",
        "content": "print('Hello World')"
        }
    ],
    temperature: 0,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    });

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

