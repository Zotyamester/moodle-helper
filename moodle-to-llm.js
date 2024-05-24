// This script works in the browser console of a quiz page inside Moodle.
// The problem is that, by default, the CORS policy blocks the request to the API,
// so that needs to be solved first.
//
// Don't forget to replace the API_KEY_HERE placeholders with your actual API keys.

async function fetchFromGemini(prompt) {
  const MODEL_NAME = "gemini-pro";
  const API_KEY = "YOUR_KEY_HERE";

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;

  const data = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
        role: "user",
      },
    ],
  };

  const headers = {
    "Content-Type": "application/json",
    "x-goog-api-key": `${API_KEY}`,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error fetching from Gemini API: ${response.statusText}`);
    }

    const responseJson = await response.json();
    const generatedText = responseJson.generations[0].text;
    console.log(generatedText);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function fetchFromClaude3(prompt) {
  const API_KEY = "YOUR_KEY_HERE";

  const url = `https://api.anthropic.com/v1/messages`;

  const messages = [
    {
      role: "user",
      content: prompt,
    },
  ];

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching from Claude-3 API: ${response.statusText}`
      );
    }

    const responseJson = await response.json();
    const generatedText = responseJson.content[0].text;
    console.log(generatedText);
  } catch (error) {
    console.error("Error:", error);
  }
}


$(".formulation").each(async function (index, formulation) {
  const question = $(".qtext", formulation).text();
  const answer = $(".answer", formulation).text();
  const context = `${question}\n${answer}`;

  // Alternatively, you can use Gemini instead of Claude-3 to generate the answer:
  // const geminiAnswer = await fetchFromGemini(context);
  // console.log(`${index}: ${geminiAnswer}`);
  const claude3Answer = await fetchFromClaude3(context);
  console.log(`${index}: ${claude3Answer}`);
});
