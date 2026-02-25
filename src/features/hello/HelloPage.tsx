import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Hello() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 3,
        gap: 3,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '5rem' }, color: 'primary.main' }}>
        Hello
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 480 }}>
        Welcome to the first page of Fleetly Booking. This is your starting point.
      </Typography>
      <Button variant="contained" size="large" component={Link} to="/hello-world">
        Go to Hello World
      </Button>
    </Box>
  );
}
