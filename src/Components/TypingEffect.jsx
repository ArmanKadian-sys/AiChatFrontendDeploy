import { useEffect, useState } from "react";

const TypingMessage = () => {
  const base = "Login/Register To Chat With Artificial";
  const words = [" Intelligence.", " Reasoning.", " Learning.", " Creativity.", " Cognition."];

  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState("base");
  const [baseIndex, setBaseIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {


      if (phase === "base") {
        setDisplayed((prev) => prev + base[baseIndex]);
        setBaseIndex((prev) => prev + 1);

        if (baseIndex + 1 === base.length) {
          setPhase("typing");
        }
      }


      else if (phase === "typing") {
        const word = words[wordIndex];
        setDisplayed(base + word.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 === word.length) {
          setPhase("deleting");
        }
      }


      else if (phase === "deleting") {
        const word = words[wordIndex];
        setDisplayed(base + word.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex - 1 === 0) {
          setPhase("typing");
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }

    }, phase === "deleting" ? 50 : 100);

    return () => clearInterval(interval);
  }, [baseIndex, charIndex, wordIndex, phase]);

  return (
    <h1 className="text-3xl md:text-5xl  tracking-tight leading-tight">
      {displayed}
      <span className="animate-pulse">|</span>
    </h1>
  );
};

export default TypingMessage;