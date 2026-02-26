import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: '"Syne", sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 600 },
        h3: { fontWeight: 600 },
        button: { fontWeight: 500, textTransform: 'none' },
    },
    palette: {
        primary: {
            main: '#fff',
            light: '#42a5f5',
            dark: '#000',
        },
        secondary: {
            main: '#9c27b0',
        },
        background: {
            default: '#fff',
            paper: '#ffffff',
        },
    },
    shape: {
        borderRadius: 10,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    paddingInline: 20,
                },
                text: {
                    color: '#000',
                },
                contained: {
                    backgroundColor: '#000',
                    color: '#FFF',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {},
            },
        },
    },
});

export default theme;
