import React from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

interface HeaderBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  filterValue: string;
  onFilterChange: (val: string) => void;
  timeRange: string;
  onTimeRangeChange: (val: string) => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  searchQuery,
  onSearchChange,
  filterValue,
  onFilterChange,
  timeRange,
  onTimeRangeChange,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
      gap={2}
      flexWrap="wrap"
    >
      <TextField
        label="Search"
        size="small"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <Select
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value)}
        size="small"
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="top">Top</MenuItem>
        <MenuItem value="new">New</MenuItem>
      </Select>
      <ToggleButtonGroup
        value={timeRange}
        exclusive
        onChange={(_, val) => val && onTimeRangeChange(val)}
        size="small"
      >
        <ToggleButton value="month">This Month</ToggleButton>
        <ToggleButton value="allTime">All Time</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default HeaderBar;
