"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { audioToText } from "@/ai/flows/audio-to-text";

const AudioToText = () => {
  const [audioUrl, setAudioUrl] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const convertAudioToText = async () => {
    setIsLoading(true);
    try {
      const result = await audioToText({ audioUrl });
      setText(result.text);
    } catch (error) {
      console.error("Error converting audio to text:", error);
      setText("Error occurred during conversion.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-[var(--audio-to-text-bg)]">
      <CardHeader>
        <CardTitle>Audio to Text</CardTitle>
        <CardDescription>Enter audio URL to convert to text</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Textarea
            placeholder="Enter audio URL here..."
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
          />
          <Button onClick={convertAudioToText} disabled={isLoading}>
            {isLoading ? "Converting..." : "Convert Audio to Text"}
          </Button>
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

export default AudioToText;
