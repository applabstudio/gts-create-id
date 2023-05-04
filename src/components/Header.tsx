import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Menu, Home, History } from '@mui/icons-material';
import LightLogo from "../assets/images/light-logo.png";
import DarkLogo from "../assets/images/dark-logo.png";
import { Link } from 'react-router-dom';

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(isOpen);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const menuItems = [
    { label: 'Home', icon: <Home />, path: '/' },
    { label: 'Cronologia ID Commesse', icon: <History />, path: '/history' },
  ];

  return (
    <div>
      <AppBar position="static" color={darkMode ? 'default' : 'primary'}>
        <Toolbar sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <Menu />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              <img src={darkMode ? DarkLogo : LightLogo} width={120} alt={'Logo'} /> {title}
            </Link>
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Switch checked={darkMode} onChange={handleDarkModeToggle} color="default" />
            <Button color="inherit" href="#search">Cerca</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.label} onClick={() => setOpen(false)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Link to={item.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                <ListItemText primary={item.label} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Header;
