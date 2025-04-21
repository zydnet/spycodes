'use server';

const API_KEY = process.env.POLLYTTS_API_KEY;
const API_URL = 'https://api.pollytts.com/v1/morse';

export async function textToMorseAudio(text: string): Promise<string> {
  if (!API_KEY) {
    throw new Error("POLLYTTS_API_KEY is not set.");
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': API_KEY,
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("PollyTTS API Error:", errorData);
      throw new Error(`PollyTTS API failed with status ${response.status}: ${errorData.error}`);
    }

    const data = await response.json();
    return data.url;
  } catch (error: any) {
    console.error("Error in pollytts.textToMorseAudio:", error);
    throw new Error(`Failed to fetch audio from PollyTTS: ${error.message}`);
  }
}
