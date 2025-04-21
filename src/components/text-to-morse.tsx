"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { textToAudio } from "@/ai/flows/text-to-audio";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useToast } from "@/hooks/use-toast";

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

const sampleAudios = [
  { label: "Sample 1", value: "sample1.mp3" },
  { label: "Sample 2", value: "sample2.mp3" },
  { label: "Sample 3", value: "sample3.mp3" },
];

const TextToMorse = () => {
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [selectedSample, setSelectedSample] = useState("");
  const [isLoading, setIsLoading] = useState(false);
   const { toast } = useToast();

  const convertToMorse = () => {
    const lowerText = text.toLowerCase();
    const morseResult = lowerText.split('').map(char => morseCodeMap[char] || char).join(' ');
    setMorse(morseResult);
  };

  const convertToAudio = async () => {
    setIsLoading(true);
    try {
      const result = await textToAudio({ text });
      setAudioUrl(result.audioUrl);
       toast({
        title: "Audio Conversion Successful!",
        description: "Morse code audio has been generated.",
      });
    } catch (error: any) {
      console.error("Error converting text to audio:", error);
       toast({
        variant: "destructive",
        title: "Audio Conversion Failed!",
        description: error.message || "Failed to convert text to audio.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSample) {
      setAudioUrl(selectedSample);
    }
  }, [selectedSample]);

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
        <div className="grid gap-2">
          <Button onClick={convertToAudio} disabled={isLoading}>
            {isLoading ? "Converting to Audio..." : "Convert to Audio"}
          </Button>
          {audioUrl && (
            <audio controls src={audioUrl}>
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
        <div>
          <Select onValueChange={setSelectedSample}>
            <SelectTrigger>
              <SelectValue placeholder="Select Sample Audio" />
            </SelectTrigger>
            <SelectContent>
              {sampleAudios.map((sample) => (
                <SelectItem key={sample.value} value={sample.value}>
                  {sample.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextToMorse;
