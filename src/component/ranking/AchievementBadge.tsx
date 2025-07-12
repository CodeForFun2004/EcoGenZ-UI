// AchievementBadge.tsx
import React from 'react';
import { Chip } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

interface AchievementBadgeProps {
  label: string;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ label }) => {
  return (
    <Chip
      icon={<EmojiEventsIcon fontSize="small" />}
      label={label}
      size="small"
      color="success"
    />
  );
};

export default AchievementBadge;
