const openaiApiKey =;

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index.html');
}

function getReply(message, conversationHistory) {
  const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  const prompt = `${conversationHistory}\nUser: ${message}\nBot: `;

  const response = UrlFetchApp.fetch(apiUrl, {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json',
    },
    payload: JSON.stringify({
      prompt: prompt,
      max_tokens: 50,
      n: 1,
      stop: ["\n"],
      temperature: 0.8,
    }),
    muteHttpExceptions: true,
  });

  const responseObject = JSON.parse(response.getContentText());
  const replyText = responseObject.choices[0].text.trim();
  const cleanedText = replyText.split('"""').join(''); // Remove code snippets, if any
  return cleanedText;
}
