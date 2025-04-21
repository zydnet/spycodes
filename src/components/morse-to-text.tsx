"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const reverseMorseCodeMap: { [key: string]: string } = {
  '.-': 'a', '-...': 'b', '-.-.': 'c', '-..': 'd', '.': 'e', '..-.': 'f',
  '--.': 'g', '....': 'h', '..': 'i', '.---': 'j', '-.-': 'k', '.-..': 'l',
  '--': 'm', '-.': 'n', '---': 'o', '.--.': 'p', '--.-': 'q', '.-.': 'r',
  '...': 's', '-': 't', '..-': 'u', '...-': 'v', '.--': 'w', '-..-': 'x',
  '-.--': 'y', '--..': 'z',
  '.----': '1', '..---': '2', '...--': '3', '....-': '4', '.....': '5',
  '-....': '6', '--...': '7', '---..': '8', '----.': '9', '-----': '0',
  '--..--': ', ', '.-.-.-': '.', '..--..': '?', '-..-.': '/', '-....-': '-',
  '-.--.': '(', '-.--.-': ')'
};

const MorseToText = () => {
  const [morse, setMorse] = useState("");
  const [text, setText] = useState("");

  const convertToText = () => {
    const morseWords = morse.split('   '); //splits to words
    const textResult = morseWords.map(word => {
      return word.split(' ').map(code => reverseMorseCodeMap[code] || code).join('');
    }).join(' ');

    setText(textResult);
  };

  return (
    <Card className="bg-[var(--morse-to-text-bg)]">
      <CardHeader>
        <CardTitle>Morse Code to Text</CardTitle>
        <CardDescription>Enter Morse code to convert to text</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Textarea
            placeholder="Enter Morse code here..."
            value={morse}
            onChange={(e) => setMorse(e.target.value)}
          />
          <Button onClick={convertToText}>Convert to Text</Button>
        </div>
        <div className="grid gap-2">
          <Textarea
            readOnly
            placeholder="Text will appear here..."
            value={text}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MorseToText;
