import React, { useState } from "react";
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
  // useTheme,
  // useMediaQuery,
} from "@mui/material";
import { Menu, Home, History, BadgeOutlined , SearchOutlined} from "@mui/icons-material";
import LightLogo from "../../assets/images/light-logo.png";
import DarkLogo from '../../assets/images/dark-logo.png';
import { Link } from "react-router-dom";
import ArticleIcon from '@mui/icons-material/Article'

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer =
    (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(isOpen);
    };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const menuItems = [
    { label: "Home", icon: <Home />, path: "/" },
    { label: "Commesse", icon: <ArticleIcon />, path: "/commesse" },
    {
      label: "Codici Clienti",
      icon: <BadgeOutlined />,
      path: "/code-customer",
    },
      {
    label: "Cerca commessa",
    icon: <SearchOutlined />,
    path: "/#search",
  },
  ];

  return (
    <div>
      <AppBar position="static" color={darkMode ? "primary" : "default"}>
        <Toolbar
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <Menu />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              <img
                src={darkMode ?  LightLogo : DarkLogo}
                width={120}
                alt={"Logo"}
              />{" "}
              {title}
            </Link>
          </Typography>
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{ marginLeft: 1 }}
                startIcon={item.icon}
                
              >
                {item.label}
              </Button>
            ))}
            <Switch
              checked={darkMode}
              onChange={handleDarkModeToggle}
              color="default"
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.label} onClick={() => setOpen(false)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Link
                to={item.path}
                style={{ color: "inherit", textDecoration: "none" }}
              >
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
