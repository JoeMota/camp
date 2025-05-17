import React from 'react';
import { Box, Container, Paper, Typography, Avatar, Stack, Divider, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const CAMP_LOGO_COLOR = '#2563eb'; // Consistent blue

const dummyUser = {
  displayName: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  role: 'contractor',
  companyName: 'Johnson Electric Co.',
  joined: '2023-10-01',
  certifications: ['Licensed Electrician', 'EV Charger Specialist'],
  jobsCompleted: 42,
  rating: 4.9,
};

export default function UserPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f6f8fb' }}>
      {/* AppBar with CAMP logo and hamburger menu */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 4 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" fontWeight={800} sx={{ color: CAMP_LOGO_COLOR, textDecoration: 'none', letterSpacing: 2 }}>
            CAMP
          </Typography>
          <IconButton edge="end" color="primary" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 5, borderRadius: 4 }}>
          <Stack direction="row" spacing={3} alignItems="center" mb={3}>
            <Avatar sx={{ width: 72, height: 72, fontSize: 36 }}>
              {dummyUser.displayName[0]}
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight={700}>{dummyUser.displayName}</Typography>
              <Typography color="text.secondary">{dummyUser.email}</Typography>
              <Typography color="primary" fontWeight={600}>
                {dummyUser.role === 'contractor' ? 'Contractor' : 'Customer/Company'}
              </Typography>
            </Box>
          </Stack>
          <Divider sx={{ mb: 3 }} />
          {dummyUser.role === 'contractor' && (
            <>
              <Typography variant="subtitle1" fontWeight={600}>Company</Typography>
              <Typography mb={2}>{dummyUser.companyName}</Typography>
            </>
          )}
          <Typography variant="subtitle1" fontWeight={600}>Joined</Typography>
          <Typography mb={2}>{dummyUser.joined}</Typography>
          <Typography variant="subtitle1" fontWeight={600}>Certifications</Typography>
          <Typography mb={2}>{dummyUser.certifications.join(', ')}</Typography>
          <Typography variant="subtitle1" fontWeight={600}>Jobs Completed</Typography>
          <Typography mb={2}>{dummyUser.jobsCompleted}</Typography>
          <Typography variant="subtitle1" fontWeight={600}>Rating</Typography>
          <Typography>{dummyUser.rating} / 5.0</Typography>
        </Paper>
      </Container>
    </Box>
  );
} 