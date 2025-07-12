import React from 'react';
import { Box, Avatar, Typography, Chip, Stack } from '@mui/material';
import ProgressBar from './ProgressBar';
import type { UserDetail } from './types';

interface UserDetailPanelProps {
  user: UserDetail;
}

const UserDetailPanel: React.FC<UserDetailPanelProps> = ({ user }) => {
  return (
    <Box textAlign="center">
      <Avatar
        src={user.avatarUrl}
        alt={user.name}
        sx={{ width: 100, height: 100, mb: 2, margin: '0 auto' }}
      />
      <Typography variant="h6">{user.name}</Typography>
      <Typography variant="subtitle1">Level {user.level}</Typography>

      <Box mt={2}>
        <ProgressBar label="Progress" value={user.progress} />
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle2" gutterBottom>
          Achievements
        </Typography>
        <Stack direction="row" spacing={1} justifyContent="center">
          {user.achievements.map((achieve, idx) => (
            <Chip key={idx} label={achieve} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default UserDetailPanel;
