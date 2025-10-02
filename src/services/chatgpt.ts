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
    const res = await fetch('https://ai-proxy-sioo.onrender.com/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!res.ok) {
      const errData = await res.json();
      return { text: '', code: 'HTTP_ERROR' };
    }

    const data = await res.json();
    return { text: data.text };
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return { text: '', code: 'TIMEOUT' };
    }
    return { text: '', code: 'NETWORK' };
  }
};

export const submitUserApplicationSupport = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { success: true };
};
