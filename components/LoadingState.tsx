'use client';

import { Box, Skeleton, Grid, Typography } from '@mui/material';

export default function LoadingState() {
  return (
    <Box>
      <Typography
        variant="body2"
        sx={{
          textAlign: 'center',
          mb: 3,
          color: '#A78BFA',
          fontWeight: 500,
          letterSpacing: '0.02em',
        }}
      >
        Analyzing job and generating quote options...
      </Typography>
      <Grid container spacing={2.5}>
        {[0, 1, 2].map((i) => (
          <Grid key={i} size={{ xs: 12, md: 4 }}>
            <Skeleton
              variant="rounded"
              height={360}
              sx={{
                borderRadius: 4,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
