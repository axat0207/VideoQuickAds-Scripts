import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});


async function generateHookAPI({concept_name, core_desire, solved_problem, emotion_to_evoke, angle } : any) {
 console.log("within api call data check : "+concept_name, core_desire, solved_problem, emotion_to_evoke, angle)

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `
        {
          "concept_name": ${concept_name},
          "core_desire": ${core_desire},
          "solved_problem": ${solved_problem},
          "emotion_to_evoke": ${emotion_to_evoke},
          "angle": ${angle}
        },
    based on this generated concept generate a hook for a video ad that contain Central  Idea , visual Hook in short, voice-over and text-overlay 
    Each element should be succinct yet impactful, driving the core message
    Focus on delivering a powerful message that resonates small yet impactfull
    only in json and give two result in an array for example
    [
      {
        "Central_Idea": "Outrun the Competition",
        "Visual_Hook": "A close-up of feet swiftly moving in Nike Air Jordans, transitioning to wide shots of young athletes racing ahead of their competitors.",
        "Voice_Over": "With every stride, conquer. Nike Air Jordan: Where speed meets victory.",
        "Text_Overlay": "Speed Unmatched. Victory Redefined."
      },
      {
        "Central_Idea": "Break Your Boundaries",
        "Visual_Hook": "Rapid montage of youth athletes starting in slow-motion, then accelerating explosively in their Nike Air Jordans across diverse terrains.",
        "Voice_Over": "Break free from the ordinary, sprint towards triumph. In Nike Air Jordan, every second counts.",
        "Text_Overlay": "Defy Limits. Embrace Speed."
      }
    ]
    
   `,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  // Assuming chatCompletion is the response object from the OpenAI API
  if (chatCompletion.choices.length > 0 && chatCompletion.choices[0].message && solved_problem && emotion_to_evoke) {
    return chatCompletion.choices[0].message.content;
  } else {
    return null;
  }
}

export default generateHookAPI;
