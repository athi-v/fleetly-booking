import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const navLinks = [
  { label: 'Hello', path: '/' },
  { label: 'Hello World', path: '/hello-world' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar sx={{ gap: 1 }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 700, letterSpacing: '-0.3px' }}
        >
          Fleetly
        </Typography>

        {/* Desktop nav links — hidden on mobile (bottom nav handles it) */}
        <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {navLinks.map(({ label, path }) => (
            <Button
              key={path}
              component={Link}
              to={path}
              color="inherit"
              sx={{
                fontWeight: location.pathname === path ? 700 : 400,
                borderBottom: location.pathname === path ? '2px solid white' : '2px solid transparent',
                borderRadius: 0,
                pb: '2px',
              }}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
