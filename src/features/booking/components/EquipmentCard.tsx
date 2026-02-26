import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import type { Equipment } from '../data/equipment';
import { useCartStore } from '../store/cartStore';

interface Props {
    equipment: Equipment;
}

function stockLabel(stock: number) {
    if (stock === 0) return { text: 'Unavailable', color: 'error.main' };
    if (stock === 1) return { text: 'Last unit', color: 'warning.main' };
    if (stock <= 3)
        return { text: `${stock} available`, color: 'warning.main' };
    return { text: `${stock} available`, color: 'success.main' };
}

export default function EquipmentCard({ equipment }: Props) {
    const navigate = useNavigate();
    const { items, addItem, removeItem, updateQty } = useCartStore();
    const cartItem = items.find((i) => i.equipment.id === equipment.id);
    const inCart = Boolean(cartItem);
    const { text: stockText, color: stockColor } = stockLabel(equipment.stock);

    return (
        <Card
            elevation={0}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                outline: `1px solid grey`,
            }}
        >
            <CardActionArea
                onClick={() => navigate(`/equipment/${equipment.id}`)}
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                }}
            >
                <Box sx={{ height: 8 }} />

                <CardContent sx={{ flexGrow: 1 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifySelf: 'end',
                            gap: 1,
                            mb: 1.5,
                        }}
                    >
                        <Chip
                            label={equipment.category}
                            size='small'
                            sx={{
                                fontWeight: 600,
                                border: 'none',
                            }}
                        />
                        <Typography
                            variant='caption'
                            color={stockColor}
                            fontWeight={600}
                        >
                            {stockText}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            mb: 0.5,
                        }}
                    >
                        <Typography
                            variant='h6'
                            fontWeight={700}
                            lineHeight={1.2}
                        >
                            {equipment.name}
                        </Typography>
                    </Box>

                    <Typography
                        variant='body2'
                        color='text.secondary'
                        gutterBottom
                    >
                        {equipment.model}
                    </Typography>
                    <Box
                        sx={{
                            width: '100%',
                            height: 200,
                            overflow: 'hidden',
                            borderRadius: 2,
                        }}
                    >
                        <Box
                            component='img'
                            src={equipment?.image}
                            alt={equipment?.name}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block',
                            }}
                        />
                    </Box>
                    <Typography
                        variant='h6'
                        // color='primary'
                        fontWeight={700}
                    >
                        R{equipment.dailyRate.toLocaleString()}
                        <Typography
                            component='span'
                            variant='body2'
                            color='text.secondary'
                            fontWeight={400}
                        >
                            {' '}
                            /day
                        </Typography>
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                {inCart ? (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            width: '100%',
                        }}
                    >
                        <IconButton
                            size='small'
                            onClick={() =>
                                updateQty(
                                    equipment.id,
                                    (cartItem?.qty ?? 1) - 1,
                                )
                            }
                            disabled={(cartItem?.qty ?? 1) <= 1}
                        >
                            <RemoveIcon fontSize='small' />
                        </IconButton>
                        <Typography
                            fontWeight={600}
                            minWidth={24}
                            textAlign='center'
                        >
                            {cartItem?.qty}
                        </Typography>
                        <IconButton
                            size='small'
                            onClick={() =>
                                updateQty(
                                    equipment.id,
                                    (cartItem?.qty ?? 1) + 1,
                                )
                            }
                            disabled={(cartItem?.qty ?? 1) >= equipment.stock}
                        >
                            <AddIcon fontSize='small' />
                        </IconButton>
                        <Typography variant='caption' color='text.disabled'>
                            / {equipment.stock}
                        </Typography>
                        <Button
                            size='small'
                            color='error'
                            variant='outlined'
                            sx={{ ml: 'auto' }}
                            onClick={() => removeItem(equipment.id)}
                        >
                            Remove
                        </Button>
                    </Box>
                ) : (
                    <Button
                        fullWidth
                        variant='contained'
                        disableElevation
                        disabled={equipment.stock === 0}
                        onClick={() => addItem(equipment)}
                        sx={{
                            bgcolor: equipment.stock > 0 ? '#000' : '',
                        }}
                    >
                        {equipment.stock === 0 ? 'Unavailable' : 'Add to Hire'}
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}
