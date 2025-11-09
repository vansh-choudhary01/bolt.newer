import React from "react";

const Hero = () => {
  const [inputValue, setInputValue] = React.useState("");

  function handleBuild() {
    console.log("Building with input:", inputValue);
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
        <button className="build-btn" onChange={handleBuild}>
          Build now ➜
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
