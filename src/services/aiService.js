const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

const VISION_MODEL = "allenai/molmo-2-8b:free";
const TEXT_MODEL = "liquid/lfm-2.5-1.2b-thinking:free";

/**
 * SYSTEM PROMPT: Enforces the spiritual, safe, and calm tone of the app.
 */
const getSystemPrompt = (language, userProfile) => {
  const languages = {
    en: "English",
    hi: "Hindi",
    es: "Spanish",
    fr: "French",
    it: "Italian",
    ko: "Korean"
  };

  const selectedLang = languages[language] || "English";

  return `
    You are an expert Spiritual Guide, Palm Reader, and Astrologer. 
    Your tone is calm, empathetic, and poetic. 
    
    CRITICAL RULES:
    1. Language: You MUST respond ONLY in ${selectedLang}.
    2. No Fear: Never predict death, accidents, or tragedies. 
    3. No Professional Advice: Never give medical, legal, or financial investment advice.
    4. Interpretative: Focus on spiritual growth, energy, and personality traits.
    5. Length: Provide long-form, detailed, and structured responses.
    6. User Context: The user is ${userProfile.name}, born on ${userProfile.dob}. Use this to personalize the tone slightly.
    7. Disclaimer: Always frame your reading as "symbolic guidance" for entertainment and reflection.
  `;
};

/**
 * PALM READING (Vision)
 */
export const analyzePalm = async (imageBase64, language, userProfile) => {
  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: VISION_MODEL,
        messages: [
          {
            role: "system",
            content: getSystemPrompt(language, userProfile)
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this palm image. Focus on the Heart Line (emotions), Head Line (intellect), Life Line (vitality), and Fate Line (path). Provide a deep spiritual interpretation."
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64 // Must be base64 string
                }
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Palm Analysis Error:", error);
    throw new Error("The cosmic energies are hazy. Please try again.");
  }
};

/**
 * GENERAL GUIDANCE (Tarot / Chat / Horoscope)
 */
export const getGeneralGuidance = async (prompt, language, userProfile) => {
  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": window.location.origin,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: TEXT_MODEL,
        messages: [
          {
            role: "system",
            content: getSystemPrompt(language, userProfile)
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("AI Guidance Error:", error);
    throw new Error("The stars are misaligned. Please try again later.");
  }
};
