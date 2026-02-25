import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const navLinks = [
  { label: 'Hello', path: '/' },
  { label: 'Hello World', path: '/hello-world' },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  return (
    <>
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

          {isMobile ? (
            <IconButton color="inherit" edge="end" onClick={() => setDrawerOpen(true)} aria-label="open menu">
              <MenuIcon />
            </IconButton>
          ) : (
            <Box component="nav" sx={{ display: 'flex', gap: 1 }}>
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
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240, pt: 1 }} role="presentation">
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 1 }}>
            <IconButton onClick={() => setDrawerOpen(false)} aria-label="close menu">
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navLinks.map(({ label, path }) => (
              <ListItemButton
                key={path}
                component={Link}
                to={path}
                selected={location.pathname === path}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={label} primaryTypographyProps={{ fontWeight: location.pathname === path ? 700 : 400 }} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
