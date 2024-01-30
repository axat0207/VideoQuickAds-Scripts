import OpenAI from "openai";

interface ContextStore {
  adObjective: String;
  brandName: string;
  brandDescription: string;
  productName: string;
  productDescription: string;
  targetAudience: string;
  platform: string;
  voiceTone: string;
  duration: string;
}

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function generateConceptAPI({
  selectedAdObjective= 'Awarness',
  brandName,
  brandDescription,
  productName,
  productDescription,
  targetAudience,
  selectedPlatform,
  voiceTone,
  duration,
}: any) {
  console.log({
    selectedAdObjective,
    brandName,
    brandDescription,
    productName,
    productDescription,
    targetAudience,
    selectedPlatform,
    voiceTone,
    duration,
  });
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `
      create a ad concepts from the below context:
      ad-objective :  ${selectedAdObjective}
      Brand Name : ${brandName}
      Brand Discription : ${brandDescription}
      Product Name : ${productName}
      Product Descriiption : ${productDescription}
      Target Audience : ${targetAudience}
      Tone of voice : ${voiceTone}
      platform : ${selectedPlatform},
      video duration :  ${duration}
      Please give: 
      Concept name,
      Core desire,
      Solved problem,
      Emotion to evoke,
      Angle,
      keep core desire in 2-3 keywords in an array, Solved problem in very small and precise, Emotion to evoke in 2-3 keywords in an array and Angle in very precise
      only in json and give two result in an array for example
      {
        adConcept: [
          {
            concept_name: 'Unleash Your Inner Athlete',
            core_desire: ['Confidence', 'Achievement'],
            solved_problem: 'Lack of high-quality sports shoes',
            emotion_to_evoke: ['Determination', 'Inspiration'],
            angle: 'Featuring young athletes pushing their limits with Nike'
          },
          {
            "concept_name": "Powerful Performance",
            "core_desire": ["Strength", "Success"],
            "solved_problem": "Lack of durable and high-performance sports shoes",
            "emotion_to_evoke": ["Motivation", "Eagerness"],
            "angle": "Showcasing young athletes dominating their sports with Nike"
          }
        ]
      }
      
   `,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  // Assuming chatCompletion is the response object from the OpenAI API
  if (chatCompletion.choices.length > 0 && chatCompletion.choices[0].message && brandName && productName) {
    return chatCompletion.choices[0].message.content;
  } else {
    return null;
  }
}

export default generateConceptAPI;
