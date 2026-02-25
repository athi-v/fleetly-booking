import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import Navbar from './components/layout/Navbar';
import Hello from './features/hello/HelloPage';
import HelloWorld from './features/hello-world/HelloWorldPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Hello />} />
          <Route path="/hello-world" element={<HelloWorld />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
