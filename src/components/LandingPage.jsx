import React from 'react';
import { AppBar, Toolbar, Typography, Box, Container, Button, Grid, IconButton, Stack, Paper, Link, Avatar, Rating } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EngineeringIcon from '@mui/icons-material/EngineeringOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonthOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import NatureIcon from '@mui/icons-material/Nature';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link as RouterLink } from 'react-router-dom';

const heroImage = 'https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2151153842.jpg?c=original';

const testimonials = [
  {
    name: 'Jane D.',
    text: 'CAMP made it so easy to get my EV charger installed. I got three quotes in an hour and picked the best pro!',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Carlos R.',
    text: 'I loved seeing all the bids and being able to compare. The work was top-notch and payment was a breeze.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Priya S.',
    text: 'Super transparent, fast, and the electrician was certified. Highly recommend CAMP!',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

export default function LandingPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)' }}>
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 0 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" component={RouterLink} to="/" sx={{ fontWeight: 800, color: 'primary.main', textDecoration: 'none' }}>
            CAMP
          </Typography>
          <IconButton edge="end" color="primary" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Hero Section with Background Image and Overlay */}
      <Box sx={{
        width: '100%',
        minHeight: { xs: 360, md: 520 },
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 0,
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        {/* Overlay */}
        <Box sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'rgba(0,0,0,0.45)',
          zIndex: 1,
        }} />
        {/* Centered Text & CTAs */}
        <Box sx={{ position: 'relative', zIndex: 2, textAlign: 'center', color: 'white', px: 2, maxWidth: 700 }}>
          <Typography variant="h2" fontWeight={900} gutterBottom sx={{ fontSize: { xs: 32, md: 56 }, textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}>
            Get Multiple Bids from Licensed Pros
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 500, textShadow: '0 2px 8px rgba(0,0,0,0.4)', mb: 4 }}>
            Post your project, sit back, and let qualified electricians compete for your work.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mb: 2 }}>
            <Button
              variant="contained"
              size="large"
              sx={{ fontWeight: 700, borderRadius: 3, fontSize: 20, py: 2 }}
              onClick={() => {
                const el = document.getElementById('how-it-works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Post Your Project
            </Button>
            <Button
              component={RouterLink}
              to="/auth"
              variant="outlined"
              size="large"
              sx={{ fontWeight: 700, borderRadius: 3, fontSize: 20, py: 2, color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white', background: 'rgba(255,255,255,0.08)' } }}
            >
              Sign Up / Log In
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Core Features Section */}
      <Box sx={{ width: '100%', py: 10, bgcolor: '#f6f8fb' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight={800} align="center" gutterBottom sx={{ mb: 7 }}>
            Why People & Companies Choose CAMP
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
              justifyContent: 'center',
              alignItems: 'stretch',
            }}
          >
            <Paper elevation={3} sx={{ flex: 1, minWidth: 220, p: 4, textAlign: 'center', borderRadius: 4, bgcolor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-8px) scale(1.03)', boxShadow: 6 } }}>
              <ChatBubbleOutlineIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mt: 1 }}>Competitive Bids</Typography>
              <Typography color="text.secondary">Contractors submit tailored proposals—you choose the best fit.</Typography>
            </Paper>
            <Paper elevation={3} sx={{ flex: 1, minWidth: 220, p: 4, textAlign: 'center', borderRadius: 4, bgcolor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-8px) scale(1.03)', boxShadow: 6 } }}>
              <EngineeringIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mt: 1 }}>Vetted Professionals</Typography>
              <Typography color="text.secondary">Every electrician is background-checked and certified.</Typography>
            </Paper>
            <Paper elevation={3} sx={{ flex: 1, minWidth: 220, p: 4, textAlign: 'center', borderRadius: 4, bgcolor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-8px) scale(1.03)', boxShadow: 6 } }}>
              <CalendarMonthIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mt: 1 }}>Flexible Scheduling</Typography>
              <Typography color="text.secondary">Pick the date and time that works for you.</Typography>
            </Paper>
            <Paper elevation={3} sx={{ flex: 1, minWidth: 220, p: 4, textAlign: 'center', borderRadius: 4, bgcolor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-8px) scale(1.03)', boxShadow: 6 } }}>
              <LockOutlinedIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="h6" fontWeight={700} gutterBottom sx={{ mt: 1 }}>Secure Payments</Typography>
              <Typography color="text.secondary">Pay through our platform only after work is done.</Typography>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box id="how-it-works" sx={{ width: '100%', py: 8, bgcolor: '#f3f6fa' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight={800} align="center" gutterBottom sx={{ mb: 6 }}>
            How It Works
          </Typography>
          <Grid container spacing={4} justifyContent="center" alignItems="flex-start">
            <Grid item xs={12} md={4}>
              <Stack alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, fontSize: 28 }}>1</Avatar>
                <Typography variant="h6" fontWeight={700}>Post Your Project</Typography>
                <Typography color="text.secondary" align="center">Describe your job (EV charger, panel upgrade, etc.) and upload photos.</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, fontSize: 28 }}>2</Avatar>
                <Typography variant="h6" fontWeight={700}>Review Bids</Typography>
                <Typography color="text.secondary" align="center">Licensed contractors send you detailed quotes and timelines.</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, fontSize: 28 }}>3</Avatar>
                <Typography variant="h6" fontWeight={700}>Hire & Relax</Typography>
                <Typography color="text.secondary" align="center">Select your contractor, schedule the work, and pay securely when it's complete.</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Why CAMP Section */}
      <Box sx={{ width: '100%', py: 8, bgcolor: 'transparent' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight={800} align="center" gutterBottom sx={{ mb: 6 }}>
            Why CAMP?
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'center',
              alignItems: 'stretch',
              gap: 6,
              mb: 2,
            }}
          >
            <Box sx={{ flex: 1, minWidth: 200, textAlign: 'center' }}>
              <AssignmentTurnedInIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography fontWeight={700} sx={{ mt: 1 }}>Transparent Bidding</Typography>
              <Typography color="text.secondary" align="center">See exactly what you'll pay before committing.</Typography>
            </Box>
            <Box sx={{ flex: 1, minWidth: 200, textAlign: 'center' }}>
              <VerifiedUserIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography fontWeight={700} sx={{ mt: 1 }}>Quality Guaranteed</Typography>
              <Typography color="text.secondary" align="center">We back every installation.</Typography>
            </Box>
            <Box sx={{ flex: 1, minWidth: 200, textAlign: 'center' }}>
              <LockOutlinedIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography fontWeight={700} sx={{ mt: 1 }}>No Upfront Fees</Typography>
              <Typography color="text.secondary" align="center">You pay only when the work is done.</Typography>
            </Box>
            <Box sx={{ flex: 1, minWidth: 200, textAlign: 'center' }}>
              <NatureIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography fontWeight={700} sx={{ mt: 1 }}>Green Experts</Typography>
              <Typography color="text.secondary" align="center">Connect with pros specializing in energy-efficient upgrades.</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Social Proof Section */}
      <Box sx={{ width: '100%', py: 8, bgcolor: '#f3f6fa' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight={800} align="center" gutterBottom sx={{ mb: 6 }}>
            What Customers Say
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {testimonials.map((t, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Paper elevation={1} sx={{ p: 4, textAlign: 'center', borderRadius: 4, height: '100%' }}>
                  <Avatar src={t.avatar} alt={t.name} sx={{ width: 56, height: 56, mx: 'auto', mb: 2 }} />
                  <Typography variant="body1" sx={{ mb: 2 }}>&ldquo;{t.text}&rdquo;</Typography>
                  <Typography variant="subtitle2" fontWeight={700}>{t.name}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 6 }}>
            <Rating value={4.8} precision={0.1} readOnly size="large" />
            <Typography variant="h6" fontWeight={700}>4.8/5</Typography>
            <Typography color="text.secondary">(200+ jobs)</Typography>
            <VerifiedUserIcon color="primary" sx={{ ml: 2 }} />
            <Typography color="text.secondary">Licensed & Insured</Typography>
          </Stack>
        </Container>
      </Box>

      {/* Secondary CTA Banner */}
      <Box sx={{ width: '100%', py: 6, bgcolor: 'primary.main', color: 'white', textAlign: 'center', mt: 8 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom>
          Ready to Post Your Project?
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ fontWeight: 700, borderRadius: 3, fontSize: 20, py: 2, mt: 2 }}
          onClick={() => {
            const el = document.getElementById('how-it-works');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Post Your Project
        </Button>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ width: '100%', bgcolor: '#f3f6fa', py: 6, mt: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between" alignItems="flex-start">
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight={700} gutterBottom>Quick Links</Typography>
              <Stack spacing={1}>
                <Link component={RouterLink} to="#how-it-works" underline="hover" color="inherit">How It Works</Link>
                <Link component={RouterLink} to="#faq" underline="hover" color="inherit">FAQ</Link>
                <Link component={RouterLink} to="#about" underline="hover" color="inherit">About</Link>
                <Link component={RouterLink} to="#contact" underline="hover" color="inherit">Contact</Link>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight={700} gutterBottom>Legal</Typography>
              <Stack spacing={1}>
                <Link component={RouterLink} to="#terms" underline="hover" color="inherit">Terms</Link>
                <Link component={RouterLink} to="#privacy" underline="hover" color="inherit">Privacy Policy</Link>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight={700} gutterBottom>Connect</Typography>
              <Stack direction="row" spacing={2}>
                <IconButton color="primary" href="https://facebook.com" target="_blank"><FacebookIcon /></IconButton>
                <IconButton color="primary" href="https://instagram.com" target="_blank"><InstagramIcon /></IconButton>
                <IconButton color="primary" href="https://linkedin.com" target="_blank"><LinkedInIcon /></IconButton>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                &copy; {new Date().getFullYear()} CAMP. All rights reserved.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
} 