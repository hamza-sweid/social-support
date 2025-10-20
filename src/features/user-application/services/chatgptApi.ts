import httpService from '../../../services/httpService';

export interface ChatGPTResponse {
  text: string;
  code?: 'TIMEOUT' | 'NETWORK' | 'HTTP_ERROR';
}

/**
 * Generate AI text suggestion using ChatGPT API
 * @param prompt - The input prompt for AI generation
 * @returns Promise with AI generated text
 */
export const generateAiText = async (
  prompt: string
): Promise<ChatGPTResponse> => {
  const bigPrompt = 'This is a test '.repeat(500000);
  const response = await httpService.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `Provide a concise suggestion based on the following input: ${bigPrompt}`,
        },
      ],
      max_tokens: 200,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
      },
    }
  );

  return { text: response.data.choices[0].message.content };
};
