import httpService from '../services/httpService';

export interface ChatGPTResponse {
  text: string;
  code?: 'TIMEOUT' | 'NETWORK' | 'HTTP_ERROR';
}

/**
 * @param prompt
 */

export const generateText = async (
  prompt: string
): Promise<ChatGPTResponse> => {
  try {
    const response = await httpService.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
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
  } catch {
    return { text: '', code: 'HTTP_ERROR' };
  }
};

/**
 * @param applicationData
 */
export const submitUserApplicationSupport = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { success: true };
};
