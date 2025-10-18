import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import type { AppDispatch } from '../../../store';
import {
  generateAiSuggestionRequest,
  clearAiError,
  selectAiLoading,
  selectAiError,
  selectAiSuggestions,
  selectCurrentAiField,
  selectSuggestionByField,
} from '../index';

/**
 * Hook for managing AI suggestions
 * Replaces state management in SuggestionModal
 */
export const useAiSuggestions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectAiLoading);
  const error = useSelector(selectAiError);
  const suggestions = useSelector(selectAiSuggestions);
  const currentField = useSelector(selectCurrentAiField);

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

  // Clear AI error
  const clearError = useCallback(() => {
    dispatch(clearAiError());
  }, [dispatch]);

  // Create selector hook for specific field
  const useSuggestionForField = (fieldName: string) => {
    return useSelector(selectSuggestionByField(fieldName));
  };

  return {
    // State
    loading,
    error,
    suggestions,
    currentField,

    // Actions
    generateSuggestion,
    getSuggestion,
    clearError,

    // Utilities
    useSuggestionForField,
  };
};
