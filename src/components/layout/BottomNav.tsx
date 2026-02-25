import { useNavigate, useLocation } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import LanguageIcon from '@mui/icons-material/Language';

const navLinks = [
  { label: 'Hello', path: '/', icon: <HomeIcon /> },
  { label: 'Hello World', path: '/hello-world', icon: <LanguageIcon /> },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: 'block', md: 'none' },
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <BottomNavigation
        value={location.pathname}
        onChange={(_e, newPath) => navigate(newPath)}
      >
        {navLinks.map(({ label, path, icon }) => (
          <BottomNavigationAction
            key={path}
            label={label}
            value={path}
            icon={icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
