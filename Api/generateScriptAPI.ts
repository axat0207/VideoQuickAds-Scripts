import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function generateScriptAPI({
  Central_Idea,
  Visual_Hook,
  Voice_Over,
  Text_Overlay,
  Video_Framework,
}: any) {
  console.log(
    "within api call data check : " + Central_Idea,
    Visual_Hook,
    Voice_Over,
    Text_Overlay,
    Video_Framework
  );

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
      Create a powerful and emotionally video ad script that follows the ${Video_Framework}  video framework, great  on-screen-visuals underscored by an inspiring voice-over and impactful text overlays. 
      on screen visuals should be in 10 words limit,
      voice_over should be in 10 words limit,
      text-Overlay should be in 8 word limit
      Dont use Pain agitate and solve for all the response please response in ${Video_Framework} video framework 
      in json like
      {
        "Framework": ["Pain", "Agitate", "Solve"],
        "Ad_Script": [
          {
            "Script_Number": 1,
            "Pain": {
              "On_Screen_Visual": "Athlete struggling, missing shots in worn-out shoes",
              "Voice_Over": "Feeling held back in your old shoes?",
              "Text_Overlay": "Stuck? Missed Goals?"
            },
            "Agitate": {
              "On_Screen_Visual": "Zoom on athlete's frustrated expression, slow motion of failure",
              "Voice_Over": "Every jump, every move, feels heavier.",
              "Text_Overlay": "The Weight of Defeat"
            },
            "Solve": {
              "On_Screen_Visual": "Athlete wearing Nike shoes, soaring high, scoring",
              "Voice_Over": "Elevate your game with Nike.",
              "Text_Overlay": "Leap Higher, Win More"
            }
          },
          {
            "Script_Number": 2,
            "Pain": {
              "On_Screen_Visual": "Basketball player slipping, stability issues on court",
              "Voice_Over": "Struggling with grip and balance?",
              "Text_Overlay": "Slippery Grip, Hard Falls"
            },
            "Agitate": {
              "On_Screen_Visual": "Close-up of player's feet slipping, others overtaking",
              "Voice_Over": "Losing ground, losing confidence.",
              "Text_Overlay": "Falling Behind, Literally"
            },
            "Solve": {
              "On_Screen_Visual": "Nike shoes gripping firmly, player regaining control",
              "Voice_Over": "Nike's grip changes the game.",
              "Text_Overlay": "Stand Firm, Play Strong"
            }
          }
        ]
      }
     or
     {
      "Framework": ["Attention", "Interest", "Desire", "Action"],
      "Ad_Script": [
        {
          "Script_Number": 1,
          "Attention": {
            "On_Screen_Visual": "Athletes jumping high in Nike shoes",
            "Voice_Over": "Elevate your play, reach new peaks.",
            "Text_Overlay": "Reach for the skies."
          },
          "Interest": {
            "On_Screen_Visual": "Slow-motion of shoes flexing, gripping",
            "Voice_Over": "Innovative design meets peak performance.",
            "Text_Overlay": "Performance redefined."
          },
          "Desire": {
            "On_Screen_Visual": "Athletes scoring, crowd cheering",
            "Voice_Over": "Be the game-changer you dream of.",
            "Text_Overlay": "Change the game."
          },
          "Action": {
            "On_Screen_Visual": "Product showcase, Nike logo shining",
            "Voice_Over": "Take your step to greatness.",
            "Text_Overlay": "Step up, stand out."
          }
        },
        {
          "Script_Number": 2,
          "Attention": {
            "On_Screen_Visual": "Dynamic basketball moves, high energy",
            "Voice_Over": "Unleash agility, dominate the court.",
            "Text_Overlay": "Dominate every game."
          },
          "Interest": {
            "On_Screen_Visual": "Zoom on shoe technology, athletes tying laces",
            "Voice_Over": "Crafted for champions, designed for victory.",
            "Text_Overlay": "Crafted for victory."
          },
          "Desire": {
            "On_Screen_Visual": "Winning shots, ecstatic celebrations",
            "Voice_Over": "Every leap, every play, you excel.",
            "Text_Overlay": "Excel in every play."
          },
          "Action": {
            "On_Screen_Visual": "Nike store display, online shopping app",
            "Voice_Over": "Join the elite, choose Nike today.",
            "Text_Overlay": "Choose elite, choose Nike."
          }
        }
      ]
    }
    
      }
    
please provide only json
      `,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  // Assuming chatCompletion is the response object from the OpenAI API
  if (
    chatCompletion.choices.length > 0 &&
    chatCompletion.choices[0].message &&
    Central_Idea &&
    Visual_Hook
  ) {
    return chatCompletion.choices[0].message.content;
  } else {
    return null;
  }
}

export default generateScriptAPI;
