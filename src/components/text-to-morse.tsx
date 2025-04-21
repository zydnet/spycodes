"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const morseCodeMap: { [key: string]: string } = {
  'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.',
  'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..',
  'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.',
  's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-',
  'y': '-.--', 'z': '--..',
  '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
  '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
  ', ': '--..--', '.': '.-.-.-', '?': '..--..', '/': '-..-.', '-': '-....-',
  '(': '-.--.', ')': '-.--.-'
};

const TextToMorse = () => {
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");

  const convertToMorse = () => {
    const lowerText = text.toLowerCase();
    const morseResult = lowerText.split('').map(char => morseCodeMap[char] || char).join(' ');
    setMorse(morseResult);
  };

  return (
    <Card className="bg-[var(--text-to-morse-bg)]">
      <CardHeader>
        <CardTitle>Text to Morse Code</CardTitle>
        <CardDescription>Enter text to convert to Morse code</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Textarea
            placeholder="Enter text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={convertToMorse}>Convert to Morse Code</Button>
        </div>
        <div className="grid gap-2">
          <Textarea
            readOnly
            placeholder="Morse code will appear here..."
            value={morse}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TextToMorse;
