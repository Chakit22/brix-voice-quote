'use client';

import { useState } from 'react';
import { Container, Box, Typography, Chip, Stack, Button, Alert } from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Header from '@/components/Header';
import MicButton from '@/components/MicButton';
import TranscriptDisplay from '@/components/TranscriptDisplay';
import QuoteCard from '@/components/QuoteCard';
import LoadingState from '@/components/LoadingState';
import type { AppState, QuoteResult } from '@/lib/types';

const SAMPLE_PROMPTS = [
  'Daikin split system not cooling, needs regas, about 8 years old',
  'Fujitsu ducted system making loud noise from outdoor unit',
  'New Mitsubishi multi-head install for 3 bedrooms',
  'Actron cassette unit leaking water, filter is clogged',
  'Annual maintenance service for Daikin ducted system',
];

export default function Home() {
  const [state, setState] = useState<AppState>('idle');
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [error, setError] = useState('');

  const handleTranscript = async (text: string) => {
    setTranscript(text);
    setState('processing');
    setError('');

    try {
      const res = await fetch('/api/generate-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: text }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data as QuoteResult);
      setState('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setState('error');
    }
  };

  const reset = () => {
    setState('idle');
    setTranscript('');
    setResult(null);
    setError('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {state === 'idle' && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography
              variant="h4"
              sx={{
                mb: 1.5,
                background: 'linear-gradient(135deg, #FAFAFA 0%, #A78BFA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Describe the job. Get a quote.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 6,
                color: 'text.secondary',
                maxWidth: 520,
                mx: 'auto',
                lineHeight: 1.8,
              }}
            >
              Tap the mic and describe what you see on site. AI will match services
              from the catalog and generate Good, Better, Best options.
            </Typography>

            <MicButton onTranscript={handleTranscript} />

            <Box sx={{ mt: 6 }}>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mb: 2,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'text.secondary',
                  fontWeight: 500,
                }}
              >
                Or try a sample
              </Typography>
              <Stack direction="row" sx={{ flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
                {SAMPLE_PROMPTS.map((prompt, i) => (
                  <Chip
                    key={i}
                    label={prompt}
                    variant="outlined"
                    onClick={() => handleTranscript(prompt)}
                    sx={{
                      cursor: 'pointer',
                      maxWidth: 360,
                      '&:hover': {
                        bgcolor: 'rgba(139, 92, 246, 0.08)',
                        borderColor: '#8B5CF6',
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </Box>
        )}

        {state === 'processing' && (
          <Box sx={{ py: 4 }}>
            <TranscriptDisplay transcript={transcript} />
            <Box sx={{ mt: 3 }}>
              <LoadingState />
            </Box>
          </Box>
        )}

        {state === 'done' && result && (
          <Box sx={{ py: 4 }}>
            <TranscriptDisplay transcript={transcript} extraction={result.extraction} searchQuery={result.searchQuery} />

            <Box sx={{ mt: 3 }}>
              <QuoteCard tiers={result.tiers} />
            </Box>

            {result.disclaimer && (
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 3,
                  textAlign: 'center',
                  color: 'text.secondary',
                  opacity: 0.7,
                }}
              >
                {result.disclaimer}
              </Typography>
            )}

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="outlined"
                startIcon={<RestartAltIcon />}
                onClick={reset}
              >
                New Quote
              </Button>
            </Box>
          </Box>
        )}

        {state === 'error' && (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <TranscriptDisplay transcript={transcript} />
            <Alert
              severity="error"
              sx={{
                mt: 3,
                bgcolor: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
              }}
            >
              {error}
            </Alert>
            <Button variant="outlined" onClick={reset} sx={{ mt: 2 }}>
              Try Again
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
