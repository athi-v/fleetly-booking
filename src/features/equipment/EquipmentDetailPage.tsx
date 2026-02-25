import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { equipment } from '../booking/data/equipment';
import { useCartStore } from '../booking/store/cartStore';

export default function EquipmentDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { items, addItem, removeItem, updateQty, openCart } = useCartStore();

    const item = equipment.find((e) => e.id === id);
    const cartItem = items.find((i) => i.equipment.id === id);
    const inCart = Boolean(cartItem);

    if (!item) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant='h6' color='text.secondary'>
                    Equipment not found.
                </Typography>
                <Button sx={{ mt: 2 }} onClick={() => navigate('/equipment')}>
                    Back to Equipment
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 860, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <IconButton onClick={() => navigate('/equipment')} size='small'>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant='body2' color='text.secondary'>
                    Plant Hire Equipment
                </Typography>
            </Box>

            <Box
                sx={{
                    height: 10,
                    bgcolor: item.color,
                    borderRadius: '8px 8px 0 0',
                }}
            />

            <Paper
                elevation={2}
                sx={{ borderRadius: '0 0 12px 12px', p: { xs: 3, md: 4 } }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: 2,
                    }}
                >
                    <Box>
                        <Typography variant='h4' fontWeight={700} gutterBottom>
                            {item.name}
                        </Typography>
                        <Typography
                            variant='subtitle1'
                            color='text.secondary'
                            gutterBottom
                        >
                            {item.model}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                flexWrap: 'wrap',
                            }}
                        >
                            <Chip
                                label={item.category}
                                size='small'
                                sx={{
                                    bgcolor: item.color + '22',
                                    color: item.color,
                                    fontWeight: 600,
                                    border: 'none',
                                }}
                            />
                            <Typography
                                variant='body2'
                                fontWeight={600}
                                color={
                                    item.stock === 0
                                        ? 'error.main'
                                        : item.stock <= 3
                                          ? 'warning.main'
                                          : 'success.main'
                                }
                            >
                                {item.stock === 0
                                    ? 'Unavailable'
                                    : item.stock === 1
                                      ? 'Last unit'
                                      : `${item.stock} available`}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                        <Typography
                            variant='h4'
                            fontWeight={700}
                            color='primary'
                        >
                            R{item.dailyRate.toLocaleString()}
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                            per day
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography variant='h6' fontWeight={600} gutterBottom>
                    About
                </Typography>
                <Typography color='text.secondary' sx={{ mb: 3 }}>
                    {item.description}
                </Typography>

                {/* Specs */}
                <Typography variant='h6' fontWeight={600} gutterBottom>
                    Specifications
                </Typography>
                <Grid container spacing={2} sx={{ mb: 4 }}>
                    {item.specs.map((s) => (
                        <Grid key={s.label} size={{ xs: 6, sm: 4 }}>
                            <Paper
                                variant='outlined'
                                sx={{ p: 2, borderRadius: 2 }}
                            >
                                <Typography
                                    variant='caption'
                                    color='text.secondary'
                                    display='block'
                                >
                                    {s.label}
                                </Typography>
                                <Typography fontWeight={700}>
                                    {s.value}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                <Divider sx={{ mb: 3 }} />

                {/* Hire actions */}
                {inCart ? (
                    <Box>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                mb: 3,
                            }}
                        >
                            <CheckCircleIcon sx={{ color: item.color }} />
                            <Typography fontWeight={600}>
                                Added to your hire booking
                            </Typography>
                        </Box>

                        {/* Units row */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                mb: 3,
                            }}
                        >
                            <Typography
                                variant='body1'
                                color='text.secondary'
                                sx={{ minWidth: 60 }}
                            >
                                Units
                            </Typography>
                            <IconButton
                                onClick={() =>
                                    updateQty(item.id, (cartItem?.qty ?? 1) - 1)
                                }
                                disabled={(cartItem?.qty ?? 1) <= 1}
                            >
                                <RemoveIcon />
                            </IconButton>
                            <Typography
                                fontWeight={700}
                                minWidth={40}
                                textAlign='center'
                            >
                                {cartItem?.qty}
                            </Typography>
                            <IconButton
                                onClick={() =>
                                    updateQty(item.id, (cartItem?.qty ?? 1) + 1)
                                }
                                disabled={(cartItem?.qty ?? 1) >= item.stock}
                            >
                                <AddIcon />
                            </IconButton>
                            <Typography variant='body2' color='text.disabled'>
                                of {item.stock} available
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant='contained'
                                size='large'
                                onClick={openCart}
                                sx={{ flexGrow: 1 }}
                            >
                                View Booking
                            </Button>
                            <Button
                                variant='outlined'
                                color='error'
                                size='large'
                                onClick={() => removeItem(item.id)}
                            >
                                Remove
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Button
                        fullWidth
                        variant='contained'
                        size='large'
                        disabled={item.stock === 0}
                        onClick={() => addItem(item)}
                        sx={{
                            bgcolor: item.stock > 0 ? item.color : undefined,
                            '&:hover': {
                                bgcolor: item.color,
                                filter: 'brightness(0.9)',
                            },
                        }}
                    >
                        {item.stock === 0 ? 'Unavailable' : 'Add to Hire'}
                    </Button>
                )}
            </Paper>
        </Box>
    );
}
