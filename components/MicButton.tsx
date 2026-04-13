'use client';

import { useState, useRef, useCallback } from 'react';
import { Box, IconButton, Typography, TextField, Button } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

interface MicButtonProps {
  onTranscript: (transcript: string) => void;
  disabled?: boolean;
}

export default function MicButton({ onTranscript, disabled }: MicButtonProps) {
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState('');
  const [supported, setSupported] = useState(true);
  const [manualText, setManualText] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-AU';

    recognition.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }
      setInterim(interimTranscript);
      if (finalTranscript) {
        recognition.stop();
        setListening(false);
        setInterim('');
        onTranscript(finalTranscript.trim());
      }
    };

    recognition.onerror = () => {
      setListening(false);
      setInterim('');
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }, [onTranscript]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setListening(false);
    setInterim('');
  }, []);

  if (!supported) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Voice input not supported in this browser. Type your job description below:
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="e.g., Daikin split system not cooling, needs regas, about 8 years old"
          value={manualText}
          onChange={(e) => setManualText(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={() => onTranscript(manualText.trim())}
          disabled={!manualText.trim() || disabled}
        >
          Generate Quote
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: 'center' }}>
      {/* Outer glow ring */}
      <Box
        sx={{
          display: 'inline-flex',
          borderRadius: '50%',
          p: '3px',
          background: listening
            ? 'linear-gradient(135deg, #EF4444, #DC2626)'
            : 'linear-gradient(135deg, #8B5CF6, #6D28D9, #A78BFA)',
          transition: 'all 0.3s ease',
        }}
      >
        <IconButton
          onClick={listening ? stopListening : startListening}
          disabled={disabled}
          sx={{
            width: 88,
            height: 88,
            bgcolor: listening ? '#EF4444' : '#8B5CF6',
            color: '#fff',
            '&:hover': {
              bgcolor: listening ? '#DC2626' : '#7C3AED',
            },
            '&:disabled': {
              bgcolor: 'rgba(139, 92, 246, 0.2)',
              color: 'rgba(255,255,255,0.3)',
            },
            transition: 'all 0.3s ease',
            animation: listening
              ? 'pulse-ring-recording 1.5s ease-in-out infinite'
              : 'none',
          }}
        >
          {listening ? (
            <StopIcon sx={{ fontSize: 38 }} />
          ) : (
            <MicIcon sx={{ fontSize: 38 }} />
          )}
        </IconButton>
      </Box>
      <Typography
        variant="body2"
        sx={{
          mt: 2.5,
          color: listening ? 'error.main' : 'text.secondary',
          fontWeight: 500,
          transition: 'color 0.3s ease',
        }}
      >
        {listening ? 'Listening... tap to stop' : 'Tap to describe the job'}
      </Typography>
      {interim && (
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            fontStyle: 'italic',
            color: 'primary.light',
            opacity: 0.7,
          }}
        >
          {interim}
        </Typography>
      )}
    </Box>
  );
}
