'use client';

import { Box, Paper, Typography, Chip, Stack } from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import type { Extraction } from '@/lib/types';

interface TranscriptDisplayProps {
  transcript: string;
  extraction?: Extraction;
  searchQuery?: string;
}

export default function TranscriptDisplay({ transcript, extraction, searchQuery }: TranscriptDisplayProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Original Transcript */}
      <Paper
        sx={{
          p: 3,
          bgcolor: 'rgba(15, 15, 20, 0.6)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #8B5CF6, transparent)',
          },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            mb: 1,
            display: 'block',
            color: '#8B5CF6',
            fontWeight: 600,
          }}
        >
          What you said
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.primary',
            fontStyle: 'italic',
            opacity: 0.9,
            lineHeight: 1.8,
          }}
        >
          &ldquo;{transcript}&rdquo;
        </Typography>
      </Paper>

      {/* Reformatted Query */}
      {searchQuery && (
        <Paper
          sx={{
            p: 3,
            bgcolor: 'rgba(15, 15, 20, 0.6)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #A78BFA, transparent)',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <AutoFixHighIcon sx={{ fontSize: 16, color: '#A78BFA' }} />
            <Typography
              variant="caption"
              sx={{
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#A78BFA',
                fontWeight: 600,
              }}
            >
              Reformatted search query
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: 'text.primary',
              fontFamily: '"DM Mono", "Fira Code", monospace',
              fontSize: '0.9rem',
              lineHeight: 1.8,
              p: 1.5,
              borderRadius: 2,
              bgcolor: 'rgba(139, 92, 246, 0.05)',
              border: '1px solid rgba(139, 92, 246, 0.1)',
            }}
          >
            {searchQuery}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mt: 1,
              color: 'text.secondary',
              opacity: 0.6,
            }}
          >
            AI extracted key terms from your description to search the service catalog
          </Typography>
        </Paper>
      )}

      {/* Extracted Details */}
      {extraction && (
        <Paper
          sx={{
            p: 3,
            bgcolor: 'rgba(15, 15, 20, 0.6)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #C084FC, transparent)',
            },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              mb: 1.5,
              display: 'block',
              color: '#C084FC',
              fontWeight: 600,
            }}
          >
            Extracted Details
          </Typography>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
            {extraction.brand && (
              <Chip label={extraction.brand} size="small" color="primary" variant="outlined" />
            )}
            {extraction.system_type && (
              <Chip label={extraction.system_type} size="small" variant="outlined" />
            )}
            {extraction.issues.map((issue, i) => (
              <Chip key={i} label={issue} size="small" color="error" variant="outlined" />
            ))}
            {extraction.services_needed.map((service, i) => (
              <Chip key={i} label={service} size="small" color="success" variant="outlined" />
            ))}
            {extraction.age_years && (
              <Chip label={`~${extraction.age_years} years old`} size="small" variant="outlined" />
            )}
            <Chip
              label={extraction.urgency}
              size="small"
              color={extraction.urgency === 'high' ? 'error' : extraction.urgency === 'medium' ? 'warning' : 'default'}
            />
          </Stack>
          {extraction.notes && (
            <Typography
              variant="body2"
              sx={{ mt: 1.5, color: 'text.secondary', fontStyle: 'italic' }}
            >
              {extraction.notes}
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
}
