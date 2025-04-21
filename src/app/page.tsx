"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextToMorse from "@/components/text-to-morse";
import MorseToText from "@/components/morse-to-text";
import AudioToText from "@/components/audio-to-text";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-5 text-center">Cryptic Decoder</h1>

      <Tabs defaultvalue="textToMorse" className="w-[80%] mx-auto">
        <TabsList>
          <TabsTrigger value="textToMorse">Text to Morse</TabsTrigger>
          <TabsTrigger value="morseToText">Morse to Text</TabsTrigger>
          <TabsTrigger value="audioToText">Audio to Text</TabsTrigger>
        </TabsList>
        <TabsContent value="textToMorse" className="pt-5">
          <TextToMorse />
        </TabsContent>
        <TabsContent value="morseToText" className="pt-5">
          <MorseToText />
        </TabsContent>
        <TabsContent value="audioToText" className="pt-5">
          <AudioToText />
        </TabsContent>
      </Tabs>
    </div>
  );
}
