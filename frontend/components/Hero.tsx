import React from "react";
import { BiLoader } from "react-icons/bi";

const Hero = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  async function handleBuild() {
    setIsLoading(true);
    console.log("Building with input:", inputValue);

    // Simulate a build process
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/template`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: inputValue }),
        }
      );

      console.log("Build response:", await response.json());
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const responseFiles = await fetch(
          `${import.meta.env.VITE_BASE_URL}/chat`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messages: [
                { type: "text", content: responseData.prompts },
                { type: "text", content: responseData.uiPrompts },
                { type: "text", content: inputValue },
              ],
            }),
          }
        );

        console.log("Chat response:", await responseFiles.json());
      }
    } catch (error) {
      console.error("Error during build:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="hero">
      <button className="tag">b² Introducing Bolt V2</button>
      <h1>
        What will you <span className="blue-text">build</span> today?
      </h1>
      <p className="subtitle">
        Create stunning apps & websites by chatting with AI.
      </p>

      <div className="hero-input">
        <input
          type="text"
          placeholder="Let's build an enterprise solution that..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="ai-select">✨ Claude Agent</div>
        <button className="build-btn" onClick={handleBuild}>
          {!isLoading ? "Build now ➜" : <BiLoader className="loader-icon" />}
        </button>
      </div>

      <div className="import-options">
        <p>or import from</p>
        <div className="options">
          <span>🎨 Figma</span>
          <span>💻 GitHub</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
