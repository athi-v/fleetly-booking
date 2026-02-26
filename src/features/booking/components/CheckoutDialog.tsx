import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useCartStore } from '../store/cartStore';

interface HireItemDetails {
    startDate: string;
    endDate: string;
    purpose: string;
}

interface ContactDetails {
    type: 'company' | 'individual';
    name: string;
    contactPerson: string;
    abn: string;
    email: string;
    phone: string;
}

const STEP_LABELS = ['Hire Details', 'Your Details', 'Review & Book'];

const today = new Date().toISOString().split('T')[0];

function calcDays(start: string, end: string): number {
    if (!start || !end || end < start) return 1;
    return Math.max(
        1,
        Math.ceil(
            (new Date(end).getTime() - new Date(start).getTime()) / 86400000,
        ) + 1,
    );
}

const defaultContact: ContactDetails = {
    type: 'company',
    name: '',
    contactPerson: '',
    abn: '',
    email: '',
    phone: '',
};

interface FormState {
    activeStep: number;
    booked: boolean;
    hireDetails: Record<string, HireItemDetails>;
    contact: ContactDetails;
}

function buildInitialForm(items: { equipment: { id: string } }[]): FormState {
    return {
        activeStep: 0,
        booked: false,
        hireDetails: Object.fromEntries(
            items.map((i) => [
                i.equipment.id,
                { startDate: today, endDate: today, purpose: '' },
            ]),
        ),
        contact: defaultContact,
    };
}

export default function CheckoutDialog() {
    const { items, checkoutOpen, closeCheckout, clearCart } = useCartStore();
    const [form, setForm] = useState<FormState>(() => buildInitialForm(items));
    const [prevCheckoutOpen, setPrevCheckoutOpen] = useState(checkoutOpen);

    if (checkoutOpen !== prevCheckoutOpen) {
        setPrevCheckoutOpen(checkoutOpen);
        if (checkoutOpen) {
            setForm(buildInitialForm(items));
        }
    }

    const { activeStep, booked, hireDetails, contact } = form;

    const setActiveStep = (fn: number | ((s: number) => number)) =>
        setForm((prev) => ({
            ...prev,
            activeStep: typeof fn === 'function' ? fn(prev.activeStep) : fn,
        }));
    const setBooked = (value: boolean) =>
        setForm((prev) => ({ ...prev, booked: value }));
    const setHireDetails = (
        fn: (
            prev: Record<string, HireItemDetails>,
        ) => Record<string, HireItemDetails>,
    ) => setForm((prev) => ({ ...prev, hireDetails: fn(prev.hireDetails) }));
    const setContact = (fn: (prev: ContactDetails) => ContactDetails) =>
        setForm((prev) => ({ ...prev, contact: fn(prev.contact) }));

    const updateHire = (
        id: string,
        field: keyof HireItemDetails,
        value: string,
    ) =>
        setHireDetails((prev) => ({
            ...prev,
            [id]: { ...prev[id], [field]: value },
        }));

    const step0Valid = items.every((i) => {
        const d = hireDetails[i.equipment.id];
        return (
            d?.startDate &&
            d?.endDate &&
            d.endDate >= d.startDate &&
            d.purpose.trim()
        );
    });

    const step1Valid = Boolean(
        contact.name.trim() && contact.email.trim() && contact.phone.trim(),
    );

    const canNext =
        activeStep === 0 ? step0Valid : activeStep === 1 ? step1Valid : true;

    const grandTotal = items.reduce((sum, { equipment, qty }) => {
        const d = hireDetails[equipment.id];
        return (
            sum +
            equipment.dailyRate *
                qty *
                (d ? calcDays(d.startDate, d.endDate) : 1)
        );
    }, 0);

    const handleClose = () => {
        if (booked) clearCart();
        closeCheckout();
    };

    const renderHireDetails = () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {items.map(({ equipment, qty }) => {
                const d = hireDetails[equipment.id] ?? {
                    startDate: today,
                    endDate: today,
                    purpose: '',
                };
                const days = calcDays(d.startDate, d.endDate);
                const dateError = Boolean(
                    d.endDate && d.startDate && d.endDate < d.startDate,
                );
                return (
                    <Paper
                        key={equipment.id}
                        variant='outlined'
                        sx={{ p: 2.5, borderRadius: 1 }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                mb: 2,
                            }}
                        >
                            <Typography fontWeight={700}>
                                {equipment.name}
                            </Typography>
                            <Chip
                                label={`${qty} unit${qty > 1 ? 's' : ''}`}
                                size='small'
                                sx={{
                                    ml: 'auto',

                                    fontWeight: 600,
                                    border: 'none',
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                flexWrap: 'wrap',
                                mb: 2,
                            }}
                        >
                            <TextField
                                label='Start Date'
                                type='date'
                                size='small'
                                value={d.startDate}
                                onChange={(e) =>
                                    updateHire(
                                        equipment.id,
                                        'startDate',
                                        e.target.value,
                                    )
                                }
                                slotProps={{
                                    inputLabel: { shrink: true },
                                    htmlInput: { min: today },
                                }}
                                sx={{ flex: 1, minWidth: 150 }}
                            />
                            <TextField
                                label='End Date'
                                type='date'
                                size='small'
                                value={d.endDate}
                                onChange={(e) =>
                                    updateHire(
                                        equipment.id,
                                        'endDate',
                                        e.target.value,
                                    )
                                }
                                slotProps={{
                                    inputLabel: { shrink: true },
                                    htmlInput: { min: d.startDate },
                                }}
                                sx={{ flex: 1, minWidth: 150 }}
                                error={dateError}
                                helperText={
                                    dateError
                                        ? 'Must be on or after start date'
                                        : `${days} day${days > 1 ? 's' : ''}`
                                }
                            />
                        </Box>
                        <TextField
                            label='What is it needed for?'
                            size='small'
                            fullWidth
                            value={d.purpose}
                            onChange={(e) =>
                                updateHire(
                                    equipment.id,
                                    'purpose',
                                    e.target.value,
                                )
                            }
                            placeholder='e.g. Site excavation at 12 Example St'
                        />
                    </Paper>
                );
            })}
        </Box>
    );

    const greyFieldSx = {
        '& .MuiOutlinedInput-root': {
            bgcolor: 'grey.100',
            '& fieldset': { borderColor: 'grey.300' },
            '&:hover fieldset': { borderColor: 'grey.400' },
        },
        '& .MuiInputLabel-root': { color: 'grey.600' },
    };

    const greyRadioSx = {
        color: 'grey.500',
        '&.Mui-checked': { color: 'grey.700' },
    };

    const renderContactDetails = () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <FormControl>
                <Typography sx={{ color: 'grey.600' }}>Booking type</Typography>
                <RadioGroup
                    row
                    value={contact.type}
                    onChange={(e) =>
                        setContact((prev) => ({
                            ...prev,
                            type: e.target.value as 'company' | 'individual',
                        }))
                    }
                >
                    <FormControlLabel
                        value='company'
                        control={<Radio sx={greyRadioSx} />}
                        label='Company'
                    />
                    <FormControlLabel
                        value='individual'
                        control={<Radio sx={greyRadioSx} />}
                        label='Individual'
                    />
                </RadioGroup>
            </FormControl>

            <TextField
                label={
                    contact.type === 'company' ? 'Company Name' : 'Full Name'
                }
                size='small'
                fullWidth
                required
                value={contact.name}
                onChange={(e) =>
                    setContact((prev) => ({ ...prev, name: e.target.value }))
                }
                sx={greyFieldSx}
            />
            {contact.type === 'company' && (
                <>
                    <TextField
                        label='Contact Person'
                        size='small'
                        fullWidth
                        value={contact.contactPerson}
                        onChange={(e) =>
                            setContact((prev) => ({
                                ...prev,
                                contactPerson: e.target.value,
                            }))
                        }
                        sx={greyFieldSx}
                    />
                    <TextField
                        label='ABN (optional)'
                        size='small'
                        fullWidth
                        value={contact.abn}
                        onChange={(e) =>
                            setContact((prev) => ({
                                ...prev,
                                abn: e.target.value,
                            }))
                        }
                        sx={greyFieldSx}
                    />
                </>
            )}
            <TextField
                label='Email'
                type='email'
                size='small'
                fullWidth
                required
                value={contact.email}
                onChange={(e) =>
                    setContact((prev) => ({ ...prev, email: e.target.value }))
                }
                sx={greyFieldSx}
            />
            <TextField
                label='Phone'
                type='tel'
                size='small'
                fullWidth
                required
                value={contact.phone}
                onChange={(e) =>
                    setContact((prev) => ({ ...prev, phone: e.target.value }))
                }
                sx={greyFieldSx}
            />
        </Box>
    );

    const renderReview = () => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
                <Typography variant='h6' fontWeight={700} gutterBottom>
                    Equipment
                </Typography>
                {items.map(({ equipment, qty }) => {
                    const d = hireDetails[equipment.id];
                    const days = d ? calcDays(d.startDate, d.endDate) : 1;
                    return (
                        <Paper
                            key={equipment.id}
                            variant='outlined'
                            sx={{ p: 2, mb: 1.5, borderRadius: 2 }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    gap: 1,
                                }}
                            >
                                <Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            mb: 0.5,
                                        }}
                                    >
                                        <Typography fontWeight={700}>
                                            {equipment.name}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                    >
                                        {qty} unit{qty > 1 ? 's' : ''} ·{' '}
                                        {d?.startDate} → {d?.endDate} ({days}{' '}
                                        day{days > 1 ? 's' : ''})
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                    >
                                        For: {d?.purpose}
                                    </Typography>
                                </Box>
                                <Typography
                                    fontWeight={700}
                                    color='primary'
                                    sx={{ flexShrink: 0 }}
                                >
                                    R
                                    {(
                                        equipment.dailyRate *
                                        qty *
                                        days
                                    ).toLocaleString()}
                                </Typography>
                            </Box>
                        </Paper>
                    );
                })}
            </Box>

            <Divider />

            <Box>
                <Typography variant='h6' fontWeight={700} gutterBottom>
                    {contact.type === 'company'
                        ? 'Company Details'
                        : 'Your Details'}
                </Typography>
                <Typography fontWeight={600}>{contact.name}</Typography>
                {contact.type === 'company' && contact.contactPerson && (
                    <Typography variant='body2' color='text.secondary'>
                        Contact: {contact.contactPerson}
                    </Typography>
                )}
                {contact.type === 'company' && contact.abn && (
                    <Typography variant='body2' color='text.secondary'>
                        ABN: {contact.abn}
                    </Typography>
                )}
                <Typography variant='body2' color='text.secondary'>
                    {contact.email}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    {contact.phone}
                </Typography>
            </Box>

            <Divider />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant='h6' fontWeight={700}>
                    Estimated Total
                </Typography>
                <Typography variant='h5' fontWeight={700} color='dark'>
                    R{grandTotal.toLocaleString()}
                </Typography>
            </Box>
        </Box>
    );

    const renderSuccess = () => (
        <Box sx={{ textAlign: 'center', py: 8 }}>
            <CheckCircleIcon
                sx={{ fontSize: 80, color: 'success.main', mb: 2 }}
            />
            <Typography variant='h5' fontWeight={700} gutterBottom>
                Booking Submitted!
            </Typography>
            <Typography
                color='text.secondary'
                sx={{ mb: 4, maxWidth: 340, mx: 'auto' }}
            >
                Your hire request has been received. We'll be in touch shortly
                to confirm.
            </Typography>
            <Button
                variant='contained'
                size='medium'
                onClick={handleClose}
                disableElevation
            >
                Done
            </Button>
        </Box>
    );

    const stepContent = [renderHireDetails, renderContactDetails, renderReview];

    return (
        <Dialog
            open={checkoutOpen}
            onClose={booked ? handleClose : undefined}
            fullScreen
            PaperProps={{ sx: { bgcolor: 'background.default' } }}
        >
            <AppBar position='sticky' color='inherit' elevation={0}>
                <Toolbar>
                    <IconButton
                        edge='start'
                        onClick={handleClose}
                        aria-label='close'
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant='h6' fontWeight={700} sx={{ ml: 1 }}>
                        Complete Booking
                    </Typography>
                </Toolbar>
                {!booked && (
                    <Box sx={{ px: 2, pb: 2 }}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {STEP_LABELS.map((label) => (
                                <Step key={label}>
                                    <StepLabel
                                        StepIconProps={{
                                            sx: {
                                                color: 'grey.400',
                                                '&.Mui-active': {
                                                    color: 'grey.100',
                                                },
                                                '&.Mui-completed': {
                                                    color: 'grey.800',
                                                },
                                            },
                                        }}
                                    >
                                        {label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                )}
            </AppBar>

            <DialogContent
                sx={{ maxWidth: 680, mx: 'auto', width: '100%', py: 3 }}
            >
                {booked ? renderSuccess() : stepContent[activeStep]()}
            </DialogContent>

            {!booked && (
                <Box
                    sx={{
                        position: 'sticky',
                        bottom: 0,
                        borderTop: 1,
                        borderColor: 'divider',
                        px: 3,
                        py: 2,
                        display: 'flex',
                        gap: 2,
                        bgcolor: 'background.paper',
                    }}
                >
                    <Button
                        variant='text'
                        onClick={() => setActiveStep((s) => s - 1)}
                        disabled={activeStep === 0}
                        sx={{ minWidth: 88 }}
                    >
                        Back
                    </Button>
                    {activeStep < STEP_LABELS.length - 1 ? (
                        <Button
                            variant='contained'
                            disableElevation
                            onClick={() => setActiveStep((s) => s + 1)}
                            disabled={!canNext}
                            sx={{ flexGrow: 1 }}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            disableElevation
                            variant='contained'
                            color='success'
                            onClick={() => setBooked(true)}
                            sx={{ flexGrow: 1 }}
                        >
                            Confirm Booking
                        </Button>
                    )}
                </Box>
            )}
        </Dialog>
    );
}
