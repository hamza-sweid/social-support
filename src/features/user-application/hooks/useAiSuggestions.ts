import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import type { AppDispatch } from '../../../store';
import {
  generateAiSuggestionRequest,
  selectAiLoading,
  selectAiSuggestions,
} from '../index';

/**
 * Hook for managing AI suggestions
 * Replaces state management in SuggestionModal
 */
export const useAiSuggestions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectAiLoading);
  const suggestions = useSelector(selectAiSuggestions);

  // Generate AI suggestion (replaces handleChatGPTSuggestionCall in SuggestionModal)
  const generateSuggestion = useCallback(
    (fieldName: string, prompt: string) => {
      dispatch(generateAiSuggestionRequest({ fieldName, prompt }));
    },
    [dispatch]
  );

  // Get suggestion for specific field
  const getSuggestion = useCallback(
    (fieldName: string) => {
      return suggestions[fieldName] || '';
    },
    [suggestions]
  );

  return {
    // State
    loading,

    // Actions
    generateSuggestion,
    getSuggestion,
  };
};
