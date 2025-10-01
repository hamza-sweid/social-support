import axios from 'axios';

export interface ChatGPTResponse {
  text: string;
}

/**
 * @param prompt text to generate
 */
export const generateText = async (
  prompt: string
): Promise<ChatGPTResponse> => {
  try {
    const response = await axios.post(
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
        timeout: 10000,
      }
    );

    return { text: response.data.choices[0].message.content };
  } catch (err: any) {
    if (axios.isCancel(err)) throw new Error('Request timed out');
    throw new Error(
      err?.response?.data?.error || 'Failed to fetch from OpenAI'
    );
  }
};
