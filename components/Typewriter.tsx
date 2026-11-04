"use client";

import { useEffect, useState } from "react";

export default function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let delay = deleting ? 45 : 85;
    if (!deleting && text === word) delay = 1600;
    if (deleting && text === "") delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index, words]);

  return (
    <span className="relative">
      <span className="bg-gradient-to-r from-primary-hover via-[#a5adff] to-primary bg-clip-text text-transparent">
        {text}
      </span>
      <span className="ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] animate-blink bg-primary-hover" />
    </span>
  );
}
