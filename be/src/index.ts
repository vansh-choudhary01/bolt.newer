// import OpenAI from "openai";
// import dotenv from "dotenv";

// dotenv.config();

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!,
// });

// async function main() {
//   const stream = await client.responses.stream({
//     model: "gpt-4.1-nano", // ✅ use this instead of gpt-5-nano
//     max_output_tokens: 100,
//     input: "How can you help me to think creatively?",
//   });


//   console.log("🌟 Generating response...\n");

//   let text = "";

//   // TypeScript-safe streaming loop
//   for await (const event of stream) {
//     // Use a type guard with string matching instead of `case`
//     const type = (event as any).type;

//     if (type === "response.output_text.delta") {
//       const delta = (event as any).delta;
//       process.stdout.write(delta);

//       text += delta;
//     } else if (type === "response.message.delta") {
//       // Some models emit text here instead
//       const delta = (event as any).delta;
//       process.stdout.write(delta);
//       text += delta;
//     } else if (type === "response.completed") {
//       console.log("\n✅ Response complete!");
//     } else if (type === "response.error") {
//       // Rare internal errors
//       console.error("❌ Stream error:", (event as any).error);
//     }
//   }


//   console.log("\n\n📝 Final Output:\n", text || "(No text was streamed)");
// }

// main()
//   .then(() => console.log("✅ Story generated successfully."))
//   .catch((error) => console.error("❌ Error generating story:", error));


require("dotenv").config();
import express from "express";
import { BASE_PROMPT, getSystemPrompt } from "./prompts";
import {basePrompt as nodeBasePrompt} from "./defaults/node";
import {basePrompt as reactBasePrompt} from "./defaults/react";
import cors from "cors";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// const anthropic = new Anthropic();
const app = express();
app.use(cors())
app.use(express.json())

app.post("/template", async (req, res) => {
    const prompt = req.body.prompt;
    
    // const response = await anthropic.messages.create({
    //     messages: [{
    //         role: 'user', content: prompt
    //     }],
    //     model: 'claude-3-5-sonnet-20241022',
    //     max_tokens: 200,
    //     system: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra"
    // })

    const response = await client.chat.completions.create({
        model: "gpt-4.1-nano",
        messages: [
            { role: "system", content: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra" },
            { role: "user", content: prompt }
        ],
        max_tokens: 50,
    })

    // console.log(response);

    // const answer = (response.content[0]).text; // react or node
    const answer = response.choices[0].message.content; // react or node
    console.log("Determined template:", answer);
    if (answer == "react") {
        res.json({
            prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [reactBasePrompt],
        })
        return;
    }

    if (answer === "node") {
        res.json({
            prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [nodeBasePrompt],
        })
        return;
    }

    res.status(403).json({message: "You cant access this"})
    return;

})

app.post("/chat", async (req, res) => {
    const messages = req.body.messages;
    // const response = await anthropic.messages.create({
    //     messages: messages,
    //     model: 'claude-3-5-sonnet-20241022',
    //     max_tokens: 8000,
    //     system: getSystemPrompt()
    // })
    const response = await client.chat.completions.create({
        model: "gpt-4.1-nano",
        messages: [
            { role: "system", content: getSystemPrompt() },
            { role: "user", content: messages }
        ],
        max_tokens: 100,
    })

    console.log(response);

    // res.json({
    //     response: (response.content[0] as TextBlock)?.text
    // });
    res.json({
        response: response.choices[0].message.content
    });
})

app.listen(3000);