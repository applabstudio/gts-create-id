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
} from '@mui/material';
import { Menu, Home } from '@mui/icons-material';
import LightLogo from "../assets/images/light-logo.png";
import DarkLogo from "../assets/images/dark-logo.png";

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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
    // { label: 'About', icon: <Inbox />, path: '/about' },
    // { label: 'Contact', icon: <Inbox />, path: '/contact' },
  ];

  return (
      <div>
        <AppBar position="static" color={darkMode ? 'default' : 'primary'}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <Menu />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <img src={darkMode ? DarkLogo : LightLogo} width={120} alt={'Logo'}/> {title}
            </Typography>
            <Switch checked={darkMode} onChange={handleDarkModeToggle} color="default" />
            <Button color="inherit" href="#search">Cerca</Button>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.label} component="a" href={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
  );
};

export default Header;
