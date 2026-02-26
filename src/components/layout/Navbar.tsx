import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useCartStore } from '../../features/booking/store/cartStore';

const navLinks = [
    { label: 'Equipment', path: '/equipment' },
    { label: 'Support', path: '/support' },
];

export default function Navbar() {
    const location = useLocation();
    const { totalItems, openCart } = useCartStore();
    const cartCount = totalItems();

    return (
        <AppBar position='sticky' color='primary' elevation={0}>
            <Toolbar sx={{ gap: 1 }}>
                <Typography
                    variant='h6'
                    component={Link}
                    to='/'
                    sx={{
                        flexGrow: 1,
                        textDecoration: 'none',
                        color: 'inherit',
                        fontWeight: 700,
                        letterSpacing: '-0.3px',
                    }}
                >
                    Fleetly
                </Typography>

                {/* Desktop nav links — hidden on mobile */}
                <Box
                    component='nav'
                    sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}
                >
                    {navLinks.map(({ label, path }) => (
                        <Button
                            key={path}
                            component={Link}
                            to={path}
                            // color='inherit'
                            variant='text'
                            sx={{
                                fontWeight:
                                    location.pathname === path ? 700 : 400,

                                borderRadius: 0,
                                pb: '2px',
                            }}
                        >
                            {label}
                        </Button>
                    ))}
                </Box>

                {/* Cart icon — always visible */}
                <IconButton
                    color='inherit'
                    onClick={openCart}
                    aria-label='open booking cart'
                >
                    <Badge badgeContent={cartCount || null} color='error'>
                        <EventNoteIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
