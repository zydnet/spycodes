"use client";

import { useState, useEffect, useRef } from "react";
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
  { label: "Sample 1", value: "https://firebasestorage.googleapis.com/v0/b/cryptic-decoder-a3b29.appspot.com/o/morse-audio%2Fsample1.mp3?alt=media&token=03487277-994e-4c25-ad8e-9f0f69c8a289" },
  { label: "Sample 2", value: "https://firebasestorage.googleapis.com/v0/b/cryptic-decoder-a3b29.appspot.com/o/morse-audio%2Fsample2.mp3?alt=media&token=34049a39-a280-463a-8747-957d5882858a" },
  { label: "Sample 3", value: "https://firebasestorage.googleapis.com/v0/b/cryptic-decoder-a3b29.appspot.com/o/morse-audio%2Fsample3.mp3?alt=media&token=9c66a2e6-19cb-488b-835a-8f16708004cb" },
];

const TextToMorse = () => {
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [selectedSample, setSelectedSample] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false); // New loading state for audio
  const audioRef = useRef<HTMLAudioElement>(null); // Ref for the audio element
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

  useEffect(() => {
    if (audioUrl) {
      setAudioLoading(true);
      // Load the audio
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.load();

        // Handle audio loading completion
        audioRef.current.onloadeddata = () => {
          setAudioLoading(false);
        };

        // Handle audio loading error
        audioRef.current.onerror = () => {
          console.error("Error loading audio");
          setAudioLoading(false);
          toast({
            variant: "destructive",
            title: "Audio Playback Failed!",
            description: "Could not load the selected audio.",
          });
        };
      }
    }
  }, [audioUrl, toast]);

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
            <>
              <audio controls src={audioUrl} ref={audioRef} >
                Your browser does not support the audio element.
              </audio>
              {audioLoading && <p>Loading audio...</p>}
            </>
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
