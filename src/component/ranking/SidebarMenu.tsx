import React from 'react';
import { List, ListItemButton, ListItemIcon, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PeopleIcon from '@mui/icons-material/People';

interface SidebarMenuProps {
  activeItem: number;
  onSelect: (id: number) => void;
}

const menuItems = [
  { id: 1, label: 'Ranking', icon: <EmojiEventsIcon /> },
  { id: 2, label: 'Home', icon: <HomeIcon /> },
  { id: 3, label: 'Users', icon: <PeopleIcon /> },
];

const SidebarMenu: React.FC<SidebarMenuProps> = ({ activeItem, onSelect }) => {
  return (
    <List sx={{ width: 80, bgcolor: 'background.paper' }}>
      {menuItems.map((item) => (
        <Tooltip key={item.id} title={item.label} placement="right">
          <ListItemButton
            selected={activeItem === item.id}
            onClick={() => onSelect(item.id)}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <ListItemIcon sx={{ minWidth: 'unset' }}>{item.icon}</ListItemIcon>
          </ListItemButton>
        </Tooltip>
      ))}
    </List>
  );
};

export default SidebarMenu;
