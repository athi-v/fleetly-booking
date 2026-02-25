import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import theme from './theme/theme';
import Navbar from './components/layout/Navbar';
import BottomNav from './components/layout/BottomNav';
import Hello from './features/hello/HelloPage';
import HelloWorld from './features/hello-world/HelloWorldPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Box component="main" sx={{ pb: { xs: '56px', md: 0 } }}>
          <Routes>
            <Route path="/" element={<Hello />} />
            <Route path="/hello-world" element={<HelloWorld />} />
          </Routes>
        </Box>
        <BottomNav />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
