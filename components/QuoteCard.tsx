'use client';

import { Box, Card, CardContent, Typography, Chip, Divider, Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import type { QuoteTier } from '@/lib/types';

interface QuoteCardProps {
  tiers: QuoteTier[];
}

function TierCard({ tier, index }: { tier: QuoteTier; index: number }) {
  const tierStyles = {
    Good: {
      accent: '#6D28D9',
      glow: 'rgba(109, 40, 217, 0.15)',
      gradient: 'linear-gradient(135deg, #6D28D9 0%, #4C1D95 100%)',
    },
    Better: {
      accent: '#8B5CF6',
      glow: 'rgba(139, 92, 246, 0.2)',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    },
    Best: {
      accent: '#A78BFA',
      glow: 'rgba(167, 139, 250, 0.25)',
      gradient: 'linear-gradient(135deg, #C084FC 0%, #8B5CF6 100%)',
    },
  };

  const style = tierStyles[tier.tier] || tierStyles.Better;

  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        borderColor: tier.recommended ? style.accent : undefined,
        borderWidth: tier.recommended ? 2 : 1,
        borderStyle: 'solid',
        transition: 'all 0.3s ease',
        ...(tier.recommended && {
          boxShadow: `0 0 60px ${style.glow}, 0 0 120px ${style.glow}`,
          transform: 'scale(1.03)',
        }),
        '&:hover': {
          borderColor: style.accent,
          boxShadow: `0 0 40px ${style.glow}`,
          transform: tier.recommended ? 'scale(1.04)' : 'scale(1.02)',
        },
        animation: `fadeSlideUp 0.4s ease ${index * 0.1}s both`,
        '@keyframes fadeSlideUp': {
          from: { opacity: 0, transform: 'translateY(16px)' },
          to: { opacity: 1, transform: tier.recommended ? 'scale(1.03)' : 'none' },
        },
      }}
    >
      {tier.recommended && (
        <Chip
          icon={<StarIcon sx={{ fontSize: 14, color: '#fff !important' }} />}
          label="Recommended"
          size="small"
          sx={{
            position: 'absolute',
            top: -12,
            left: '50%',
            transform: 'translateX(-50%)',
            background: style.gradient,
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.7rem',
            letterSpacing: '0.05em',
            border: 'none',
            boxShadow: `0 4px 16px ${style.glow}`,
          }}
        />
      )}
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 2.5 }}>
          <Typography
            variant="overline"
            sx={{
              background: style.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
              letterSpacing: '0.2em',
              fontSize: '0.65rem',
            }}
          >
            {tier.tier}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
            {tier.label}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {tier.description}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {tier.line_items.map((item, i) => (
          <Box
            key={i}
            sx={{
              mb: 2,
              p: 1.5,
              borderRadius: 2,
              bgcolor: 'rgba(139, 92, 246, 0.04)',
              border: '1px solid rgba(139, 92, 246, 0.06)',
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {item.service}
            </Typography>
            {item.parts.length > 0 && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
                Parts: {item.parts.join(', ')}
              </Typography>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.75 }}>
              <Typography variant="caption" color="text.secondary">
                Parts: ${item.parts_cost.toFixed(0)} | Labour: ${item.labour_cost.toFixed(0)}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, color: style.accent }}>
                ${item.total.toFixed(0)}
              </Typography>
            </Box>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">Subtotal</Typography>
          <Typography variant="body2">${tier.subtotal.toFixed(0)}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
          <Typography variant="body2" color="text.secondary">GST (10%)</Typography>
          <Typography variant="body2">${tier.gst.toFixed(0)}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1.5,
            borderRadius: 2,
            background: `linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(139, 92, 246, 0.03))`,
            border: '1px solid rgba(139, 92, 246, 0.1)',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Total</Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              background: style.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ${tier.total.toFixed(0)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function QuoteCard({ tiers }: QuoteCardProps) {
  return (
    <Grid container spacing={2.5}>
      {tiers.map((tier, index) => (
        <Grid key={tier.tier} size={{ xs: 12, md: 4 }}>
          <TierCard tier={tier} index={index} />
        </Grid>
      ))}
    </Grid>
  );
}
