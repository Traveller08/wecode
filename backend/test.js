import axios from 'axios';
async function generateText(prompt) {
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.7,
      n: 1
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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' // Replace with your OpenAI API key
      }
    });

    const { choices } = response.data;
    const generatedText = choices[0].text.trim();

    return generatedText;
  } catch (error) {
    console.error('Error:', error.response.data.error);
    throw error;
  }
}

// Usage example
const prompt = "Once upon a time";
generateText(prompt)
  .then(generatedText => {
    console.log('Generated text:', generatedText);
  })
  .catch(error => {
    console.error('Error:', error);
  });
