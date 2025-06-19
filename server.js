import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = 'AIzaSyBsdYS0Cxcb8N6IA5Q3PEeadFdS57yEXzU'; // Make sure this is a valid API key

app.post('/ask-gemini', async (req, res) => {
  try {
    const userPrompt = req.body.prompt;

    if (!userPrompt || typeof userPrompt !== 'string') {
      return res.status(400).json({ reply: "Please enter a valid prompt." });
    }

    const fullPrompt = `
My name is Raymond Williams. I am a front-end developer and aspiring Full Stack Developer based in Abuja Nigeria.
I specialize in HTML5, CSS3, JavaScript, React, UI/UX, GSAP, Next.js. I’ve built sleek up to date websites, portfolio sites, simple games, and more.
I’m passionate about design, sleek user interfaces, and creating meaningful digital experiences.

User: ${userPrompt}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: fullPrompt }]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      return res.status(500).json({ reply: "Failed to get a valid response from Gemini." });
    }

    const data = await response.json();
    console.log("Gemini raw response:", JSON.stringify(data, null, 2));
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't answer that.";

    res.json({ reply });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ reply: "Server error occurred." });
  }
});

if (!response.ok) {
  const errorText = await response.text();
  console.error("Gemini API error:", errorText);

  if (errorText.includes("RESOURCE_EXHAUSTED")) {
    return res.status(429).json({ reply: "Raymond's AI is resting. Please try again tomorrow!" });
  }

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
