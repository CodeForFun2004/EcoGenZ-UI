import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import type { UserItem } from './types';

interface RankingItemProps {
  user: UserItem;
}

const RankingItem: React.FC<RankingItemProps> = ({ user }) => {
  const isPositive = (user.pointChange || 0) >= 0;

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={user.avatarUrl} alt={user.name} />
      </ListItemAvatar>
      <ListItemText
        primary={`${user.rank}. ${user.name}`}
        secondary={`Level ${user.level}`}
      />
      <Typography variant="body2" sx={{ mr: 1 }}>
        {user.points} pts
      </Typography>
      {user.pointChange !== undefined && (
        <Typography
          variant="body2"
          color={isPositive ? 'success.main' : 'error.main'}
          display="flex"
          alignItems="center"
        >
          {isPositive ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
          {Math.abs(user.pointChange)}
        </Typography>
      )}
    </ListItem>
  );
};

export default RankingItem;
