import { BottomNavigation, BottomNavigationAction, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from '@mui/icons-material/Article'
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import AddIcon from "@mui/icons-material/Add";

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  path: string;
  hash: string;
}

const menuItems: MenuItem[] = [
  { label: "Home", icon: <HomeIcon />, path: "/", hash: "home" },
  { label: "Crea", icon: <AddIcon />, path: "/", hash: "start" },
  {
    label: "Commesse",
    icon: <ArticleIcon />,
    path: "/commesse",
    hash: "commesse",
  },
  {
    label: "Clienti",
    icon: <BadgeOutlinedIcon />,
    path: "/code-customer",
    hash: "clienti",
  },
];

export default function BottomTabBar() {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!isMobile) {
    // Non renderizzare la Bottom Tab Bar per dispositivi non mobili
    return null;
  }

  return (
    <Box sx={{ position: "fixed", bottom: 0, width: "100%", zIndex: 1000 , boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.8)" }}>
<BottomNavigation value={location.pathname} showLabels>
  {menuItems.map((item) => (
    <BottomNavigationAction
    key={item.path}
    label={item.label}
    value={item.path}
    icon={item.icon}
    component={Link}
    to={item.path === "/#start" ? "/#start" : item.path}
  />
  
  ))}
</BottomNavigation>

    </Box>
  );
}
