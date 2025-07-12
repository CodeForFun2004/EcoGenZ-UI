// ProgressBar.tsx
import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

interface ProgressBarProps {
  label: string;
  value: number; // từ 0 đến 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value }) => {
  return (
    <Box mb={2}>
      <Typography variant="caption" gutterBottom>
        {label}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: (theme) =>
            theme.palette.grey[300],
          '& .MuiLinearProgress-bar': {
            backgroundColor: (theme) =>
              value < 50
                ? theme.palette.error.main
                : value < 80
                ? theme.palette.warning.main
                : theme.palette.success.main,
          },
        }}
      />
      <Typography
        variant="caption"
        display="block"
        textAlign="right"
        mt={0.5}
      >
        {value}%
      </Typography>
    </Box>
  );
};

export default ProgressBar;
