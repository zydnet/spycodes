'use server';

/**
 * @fileOverview Converts text to Morse code audio using an external API.
 *
 * - textToAudio - A function that handles the text to audio conversion process.
 * - TextToAudioInput - The input type for the textToAudio function.
 * - TextToAudioOutput - The return type for the textToAudio function.
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';
import { textToMorseAudio } from '@/services/pollytts';

const TextToAudioInputSchema = z.object({
  text: z.string().describe('The text to convert to Morse code audio.'),
});
export type TextToAudioInput = z.infer<typeof TextToAudioInputSchema>;

const TextToAudioOutputSchema = z.object({
  audioUrl: z.string().describe('The URL of the generated Morse code audio.'),
});
export type TextToAudioOutput = z.infer<typeof TextToAudioOutputSchema>;

export async function textToAudio(input: TextToAudioInput): Promise<TextToAudioOutput> {
  return textToAudioFlow(input);
}

const textToAudioPrompt = ai.definePrompt({
  name: 'textToAudioPrompt',
  input: {
    schema: z.object({
      text: z.string().describe('The text to convert to Morse code audio.'),
    }),
  },
  output: {
    schema: z.object({
      audioUrl: z.string().describe('The URL of the generated Morse code audio.'),
    }),
  },
  prompt: `You are an expert in converting text to Morse code audio. You will be provided with text, and your task is to generate the Morse code audio URL for the given text.

Text: {{text}}

Make sure you return only the audio URL.
`,
});

const textToAudioFlow = ai.defineFlow<
  typeof TextToAudioInputSchema,
  typeof TextToAudioOutputSchema
>(
  {
    name: 'textToAudioFlow',
    inputSchema: TextToAudioInputSchema,
    outputSchema: TextToAudioOutputSchema,
  },
  async input => {
    try {
      const audioUrl = await textToMorseAudio(input.text);
      return { audioUrl };
    } catch (error: any) {
      console.error("Error converting text to audio:", error);
      throw new Error(`Failed to convert text to audio: ${error.message}`);
    }
  }
);
