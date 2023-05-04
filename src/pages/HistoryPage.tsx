import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { Delete, SearchOutlined } from '@mui/icons-material';
import CommessaIcon from '../assets/images/commessa.png';

const HistoryPage: React.FC = () => {
  const [idHistory, setIdHistory] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Ottiene la cronologia degli id dalle localStorage
  useEffect(() => {
    const history = localStorage.getItem('idHistory');
    if (history) {
      setIdHistory(JSON.parse(history));
    }
  }, []);

  // Rimuove un ID dalla cronologia
  const removeIdFromHistory = (id: string) => {
    const updatedHistory = idHistory.filter((historyId) => historyId !== id);
    setIdHistory(updatedHistory);
    localStorage.setItem('idHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div style={{ height: '100vh', overflow: 'auto' }}>
      <Box sx={{ px: 3, pt: 3 }}>
        <Typography variant="h5" component="h3">
          Cronologia Commesse generate
        </Typography>
      </Box>
      <Box sx={{ px: 3, pt: 2 }}>
        <TextField
          sx={{ my: 2 }}
          label="Cerca"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
          id="search"
        />
        <List sx={{ bgcolor: 'background.paper' }}>
          {idHistory
            .filter((id) => id.includes(searchTerm))
            .map((id) => (
              <ListItem
                key={id}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => removeIdFromHistory(id)}>
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  <img src={CommessaIcon} alt="commessa" width={42} />
                </ListItemIcon>
                <ListItemText primary={id} />
              </ListItem>
            ))}
        </List>
      </Box>
    </div>
  );
};

export default HistoryPage;
