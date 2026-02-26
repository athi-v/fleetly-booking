import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useCartStore } from '../store/cartStore';

export default function CartDrawer() {
    const {
        items,
        isOpen,
        closeCart,
        removeItem,
        updateQty,
        updateDays,
        totalCost,
        openCheckout,
    } = useCartStore();

    return (
        <Drawer
            anchor='right'
            open={isOpen}
            onClose={closeCart}
            PaperProps={{ sx: { width: { xs: '100%', sm: 420 } } }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    px: 2,
                    py: 1.5,
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <EventNoteIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant='h6' fontWeight={700} sx={{ flexGrow: 1 }}>
                    Booking ({items.length})
                </Typography>
                <IconButton onClick={closeCart} aria-label='close cart'>
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* Empty state */}
            {items.length === 0 && (
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        p: 4,
                    }}
                >
                    <EventNoteIcon
                        sx={{ fontSize: 64, color: 'text.disabled' }}
                    />
                    <Typography color='text.secondary' textAlign='center'>
                        No equipment added yet.{' '}
                        <Box
                            component='span'
                            onClick={closeCart}
                            sx={{
                                color: 'primary.dark',
                                cursor: 'pointer',
                            }}
                        >
                            Browse equipment
                        </Box>
                    </Typography>
                </Box>
            )}

            {/* Items */}
            {items.length > 0 && (
                <>
                    <Stack
                        divider={<Divider />}
                        sx={{ flex: 1, overflowY: 'auto' }}
                    >
                        {items.map(({ equipment, qty, days }) => (
                            <Box key={equipment.id} sx={{ px: 2, py: 2 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 1,
                                    }}
                                >
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography fontWeight={700}>
                                            {equipment.name}
                                        </Typography>
                                        <Typography
                                            variant='body2'
                                            color='text.secondary'
                                        >
                                            {equipment.category} ·{' '}
                                            {equipment.model}
                                        </Typography>
                                    </Box>
                                    <IconButton
                                        size='small'
                                        onClick={() => removeItem(equipment.id)}
                                        aria-label='remove'
                                    >
                                        <DeleteOutlineIcon fontSize='small' />
                                    </IconButton>
                                </Box>

                                {/* Units selector */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mt: 1.5,
                                        gap: 1,
                                    }}
                                >
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                        sx={{ width: 36 }}
                                    >
                                        Units
                                    </Typography>
                                    <IconButton
                                        size='small'
                                        onClick={() =>
                                            updateQty(equipment.id, qty - 1)
                                        }
                                        disabled={qty <= 1}
                                    >
                                        <RemoveIcon fontSize='small' />
                                    </IconButton>
                                    <Typography
                                        fontWeight={600}
                                        minWidth={24}
                                        textAlign='center'
                                    >
                                        {qty}
                                    </Typography>
                                    <IconButton
                                        size='small'
                                        onClick={() =>
                                            updateQty(equipment.id, qty + 1)
                                        }
                                        disabled={qty >= equipment.stock}
                                    >
                                        <AddIcon fontSize='small' />
                                    </IconButton>
                                    <Typography
                                        variant='caption'
                                        color='text.disabled'
                                    >
                                        / {equipment.stock}
                                    </Typography>
                                </Box>

                                {/* Days selector */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        mt: 0.5,
                                        gap: 1,
                                    }}
                                >
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                        sx={{ width: 36 }}
                                    >
                                        Days
                                    </Typography>
                                    <IconButton
                                        size='small'
                                        onClick={() =>
                                            updateDays(equipment.id, days - 1)
                                        }
                                        disabled={days <= 1}
                                    >
                                        <RemoveIcon fontSize='small' />
                                    </IconButton>
                                    <Typography
                                        fontWeight={600}
                                        minWidth={24}
                                        textAlign='center'
                                    >
                                        {days}
                                    </Typography>
                                    <IconButton
                                        size='small'
                                        onClick={() =>
                                            updateDays(equipment.id, days + 1)
                                        }
                                    >
                                        <AddIcon fontSize='small' />
                                    </IconButton>
                                </Box>

                                {/* Subtotal */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        mt: 1,
                                    }}
                                >
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                    >
                                        R{equipment.dailyRate.toLocaleString()}{' '}
                                        × {qty} × {days} day
                                        {days > 1 ? 's' : ''}
                                    </Typography>
                                    <Typography
                                        fontWeight={700}
                                        color='primary'
                                    >
                                        R
                                        {(
                                            equipment.dailyRate *
                                            qty *
                                            days
                                        ).toLocaleString()}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Stack>

                    {/* Footer */}
                    <Box sx={{ borderTop: 1, borderColor: 'divider', p: 2 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mb: 2,
                            }}
                        >
                            <Typography variant='h6' fontWeight={700}>
                                Total
                            </Typography>
                            <Typography
                                variant='h6'
                                fontWeight={700}
                                color='dark'
                            >
                                R{totalCost().toLocaleString()}
                            </Typography>
                        </Box>
                        <Button
                            fullWidth
                            disableElevation
                            variant='contained'
                            size='large'
                            onClick={openCheckout}
                        >
                            Confirm Booking
                        </Button>
                    </Box>
                </>
            )}
        </Drawer>
    );
}
