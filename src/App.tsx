import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import theme from './theme/theme';
import Navbar from './components/layout/Navbar';
import BottomNav from './components/layout/BottomNav';
import CartDrawer from './features/booking/components/CartDrawer';
import CheckoutDialog from './features/booking/components/CheckoutDialog';
import EquipmentPage from './features/equipment/EquipmentPage';
import EquipmentDetailPage from './features/equipment/EquipmentDetailPage';
import SupportPage from './features/support/SupportPage';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Navbar />
                <Box component='main' sx={{ pb: { xs: '56px', md: 0 } }}>
                    <Routes>
                        <Route
                            path='/'
                            element={<Navigate to='/equipment' replace />}
                        />{' '}
                        <Route path='/equipment' element={<EquipmentPage />} />
                        <Route path='/support' element={<SupportPage />} />
                        <Route
                            path='/equipment/:id'
                            element={<EquipmentDetailPage />}
                        />
                    </Routes>
                </Box>
                <BottomNav />
                <CartDrawer />
                <CheckoutDialog />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
