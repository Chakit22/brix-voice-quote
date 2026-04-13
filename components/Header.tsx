'use client';

import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';

export default function Header() {
  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
        zIndex: 10,
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <BoltIcon
            sx={{
              color: '#8B5CF6',
              fontSize: 28,
              filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 50%, #6D28D9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            brix
          </Typography>
        </Box>
        <Box
          sx={{
            mx: 2,
            height: 20,
            width: '1px',
            background: 'linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.3), transparent)',
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
            letterSpacing: '0.02em',
          }}
        >
          Voice-to-Quote
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
