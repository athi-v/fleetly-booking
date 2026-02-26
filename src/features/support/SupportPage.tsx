import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const faqs = [
    {
        q: 'How do I make a booking?',
        a: 'Browse the Equipment page, add what you need to your booking, then click "Confirm Booking" to fill in hire dates and your contact details.',
    },
    {
        q: 'How far in advance do I need to book?',
        a: 'We recommend booking at least 48 hours in advance to ensure availability. For large fleets or peak periods, earlier is better.',
    },
    {
        q: 'What is your cancellation policy?',
        a: 'Cancellations made more than 24 hours before the hire start date are free of charge. Late cancellations may incur a fee — contact us to discuss.',
    },
    {
        q: 'Is an operator included with the hire?',
        a: 'Equipment is dry-hired (machine only) unless otherwise arranged. Operated hire is available on request — please contact us for a quote.',
    },
    {
        q: 'What do I need to provide on site?',
        a: 'You are responsible for a clear access route, a level area to offload, and any site-specific permits. Our team can advise if you are unsure.',
    },
    {
        q: 'How is pricing calculated?',
        a: 'Pricing is based on a daily rate per machine multiplied by the number of units and hire days. You will see the estimated total before confirming.',
    },
];

export default function SupportPage() {
    return (
        <Box sx={{ maxWidth: 760, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
            <Typography variant='h4' fontWeight={700} gutterBottom>
                Support
            </Typography>
            <Typography color='text.secondary' sx={{ mb: 4 }}>
                Need help? Check the FAQs below or get in touch with our team
                directly.
            </Typography>

            {/* Contact cards */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 5 }}>
                <Paper
                    variant='outlined'
                    sx={{ flex: 1, minWidth: 200, p: 2.5, borderRadius: 2 }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 1,
                        }}
                    >
                        <PhoneIcon color='primary' fontSize='small' />
                        <Typography fontWeight={700}>Phone</Typography>
                    </Box>
                    <Link
                        href='tel:+61290000000'
                        underline='hover'
                        color='text.primary'
                    >
                        +27 (0) 733 1234
                    </Link>
                </Paper>

                <Paper
                    variant='outlined'
                    sx={{ flex: 1, minWidth: 200, p: 2.5, borderRadius: 2 }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 1,
                        }}
                    >
                        <EmailIcon color='primary' fontSize='small' />
                        <Typography fontWeight={700}>Email</Typography>
                    </Box>
                    <Link
                        href='mailto:hire@fleetly.com.au'
                        underline='hover'
                        color='text.primary'
                    >
                        test@test.com
                    </Link>
                </Paper>

                <Paper
                    variant='outlined'
                    sx={{ flex: 1, minWidth: 200, p: 2.5, borderRadius: 2 }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 1,
                        }}
                    >
                        <AccessTimeIcon color='primary' fontSize='small' />
                        <Typography fontWeight={700}>Hours</Typography>
                    </Box>
                    <Typography variant='body2' color='text.secondary'>
                        Mon – Fri: 7 am – 5 pm
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Sat: 7 am – 12 pm
                    </Typography>
                </Paper>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* FAQs */}
            <Typography variant='h5' fontWeight={700} gutterBottom>
                Frequently Asked Questions
            </Typography>

            <Box sx={{ mt: 2 }}>
                {faqs.map((faq) => (
                    <Accordion
                        key={faq.q}
                        disableGutters
                        elevation={0}
                        variant='outlined'
                        sx={{
                            mb: 1,
                            borderRadius: '8px !important',
                            '&:before': { display: 'none' },
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography fontWeight={600}>{faq.q}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography color='text.secondary'>
                                {faq.a}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Box>
    );
}
