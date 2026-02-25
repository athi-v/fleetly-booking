import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { Link } from 'react-router-dom';

export default function HelloWorld() {
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
      <Chip label="Page 2" color="secondary" size="small" />
      <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '5rem' }, color: 'secondary.main' }}>
        Hello World
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 480 }}>
        This is the second page. Navigate freely between both pages using the nav bar above.
      </Typography>
      <Button variant="outlined" size="large" component={Link} to="/">
        Back to Hello
      </Button>
    </Box>
  );
}
