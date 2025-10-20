import DOMPurify from 'dompurify';

/**
 * AI response sanitization - specifically for ChatGPT responses
 * Use for: AI-generated content that might contain malicious prompts
 */
export const sanitizeAiResponse = (
  response: string | null | undefined
): string => {
  if (!response || typeof response !== 'string') return '';

  // First pass: Remove potential script injections
  let sanitized = DOMPurify.sanitize(response, {
    // Use DOMPurify to clean the response
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'], // Allow only basic formatting tags
    ALLOWED_ATTR: [], // No attributes allowed
    KEEP_CONTENT: true, // Keep the content even if tags are removed
  });

  // Second pass: Remove common XSS patterns that might slip through
  sanitized = sanitized
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+\s*=/gi, '') // Remove event handlers like onclick=
    .trim();

  return sanitized;
};
