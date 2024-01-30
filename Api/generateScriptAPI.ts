import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});


async function generateScriptAPI({Central_Idea, Visual_Hook, Voice_Over, Text_Overlay } : any) {
 console.log("within api call data check : "+Central_Idea, Visual_Hook, Voice_Over, Text_Overlay)

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `using this this adHook{
          "Central_Idea": ${Central_Idea},
          "Visual_Hook": ${Visual_Hook},
          "Voice_Over": ${Voice_Over},
          "Text_Overlay": ${Text_Overlay}
        }
      Create a powerful and emotionally video ad script that follows the PAS (Pain, Agitate, Solve) framework, great  on-screen-visuals underscored by an inspiring voice-over and impactful text overlays. in json like
      {
        "Ad_Script": [
          {
            "Ad_Block_Type": "Pain",
            "On_Screen_Visual": "An athlete struggling during practice, their movements slow and heavy.",
            "Voice_Over": "Still not making the cut? Every second feels like an eternity, every step heavy with defeat.",
            "Text_Overlay": "Stuck on the bench? Watching, waiting, wishing."
          },
          {
            "Ad_Block_Type": "Agitate",
            "On_Screen_Visual": "Frustration and disappointment on the athlete's face, their efforts yielding no improvement.",
            "Voice_Over": "Feel like your progress has flatlined? That despite all your effort, you're just running in place?",
            "Text_Overlay": "Dreams out of reach? The gap between you and victory, widening."
          },
          {
            "Ad_Block_Type": "Solve",
            "On_Screen_Visual": "Transition to the athlete now training in Nike Air Jordans, their movements swift and powerful.",
            "Voice_Over": "With Nike Air Jordan, every stride breaks through barriers. Speed meets victory, and you, conquer.",
            "Text_Overlay": "Speed Unmatched. Victory Redefined. Unleash your potential."
          }
        ]
      }
      `,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  // Assuming chatCompletion is the response object from the OpenAI API
  if (chatCompletion.choices.length > 0 && chatCompletion.choices[0].message && Central_Idea && Visual_Hook) {
    return chatCompletion.choices[0].message.content;
  } else {
    return null;
  }
}

export default generateScriptAPI;
