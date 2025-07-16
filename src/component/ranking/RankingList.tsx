import React from 'react';
import { List } from '@mui/material';
import RankingItem from './RankingItem';
import type { UserItem } from './types';

interface RankingListProps {
  users: UserItem[];
}

const RankingList: React.FC<RankingListProps> = ({ users }) => {
  return (
    <List>
      {users.map((user) => (
        <RankingItem key={user.id} user={user} />
      ))}
    </List>
  );
};

export default RankingList;
