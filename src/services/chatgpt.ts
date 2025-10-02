import axios from 'axios';

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
    console.error(err);

    if (err.code === 'ECONNABORTED') {
      return { text: '', code: 'TIMEOUT' };
    }

    if (!err.response) {
      return { text: '', code: 'NETWORK' };
    }

    return { text: '', code: 'HTTP_ERROR' };
  }
};

export const submitUserApplicationSupport = async (data: any) => {
  console.log('Submitting user application support data:', data);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { success: true };
};
