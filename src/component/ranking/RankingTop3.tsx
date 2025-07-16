import React from 'react';
import { Box, Avatar, Typography, Stack } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import type { UserItem } from './types';

interface RankingTop3Props {
  users: UserItem[];
}

const RankingTop3: React.FC<RankingTop3Props> = ({ users }) => {
  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      {users.map((user, index) => (
        <Box key={user.id} textAlign="center">
          {index === 0 && (
            <EmojiEventsIcon color="warning" sx={{ fontSize: 40, mb: 1 }} />
          )}
          <Avatar
            src={user.avatarUrl}
            alt={user.name}
            sx={{ width: 64, height: 64, margin: '0 auto' }}
          />
          <Typography variant="subtitle1">{user.name}</Typography>
          <Typography variant="body2">Level {user.level}</Typography>
          <Typography variant="h6">{user.points} pts</Typography>
        </Box>
      ))}
    </Stack>
  );
};

export default RankingTop3;
