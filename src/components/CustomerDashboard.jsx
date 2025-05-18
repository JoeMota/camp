import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  AppBar,
  Toolbar
} from '@mui/material';
import { Add as AddIcon, Menu as MenuIcon } from '@mui/icons-material';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

const CAMP_LOGO_COLOR = '#2563eb';

const jobTypes = [
  'Residential',
  'Commercial',
  'Industrial',
  'Emergency',
  'Maintenance'
];

export default function CustomerDashboard() {
  const [openJobForm, setOpenJobForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    type: '',
    location: '',
    date: '',
    files: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    if (!auth.currentUser) return;
    
    const jobsQuery = query(
      collection(db, 'jobs'),
      where('customerId', '==', auth.currentUser.uid)
    );
    
    const querySnapshot = await getDocs(jobsQuery);
    const jobsList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setJobs(jobsList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    try {
      const jobData = {
        ...newJob,
        customerId: auth.currentUser.uid,
        status: 'open',
        createdAt: serverTimestamp(),
        customerName: auth.currentUser.displayName || 'Anonymous'
      };

      await addDoc(collection(db, 'jobs'), jobData);
      setOpenJobForm(false);
      setNewJob({
        title: '',
        description: '',
        type: '',
        location: '',
        date: '',
        files: null
      });
      fetchJobs();
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f6f8fb' }}>
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

      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4" fontWeight={700}>My Jobs</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenJobForm(true)}
            sx={{ bgcolor: CAMP_LOGO_COLOR }}
          >
            Post New Job
          </Button>
        </Box>

        <Grid container spacing={3}>
          {jobs.map((job) => (
            <Grid item xs={12} md={6} key={job.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{job.title}</Typography>
                  <Typography color="text.secondary" gutterBottom>{job.type}</Typography>
                  <Typography variant="body2">{job.description}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Location: {job.location}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">View Details</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={openJobForm} onClose={() => setOpenJobForm(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Post a New Job</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                fullWidth
                label="Job Title"
                value={newJob.title}
                onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Description"
                value={newJob.description}
                onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                margin="normal"
                multiline
                rows={4}
                required
              />
              <TextField
                fullWidth
                select
                label="Job Type"
                value={newJob.type}
                onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                margin="normal"
                required
              >
                {jobTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="Location"
                value={newJob.location}
                onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Preferred Date"
                type="date"
                value={newJob.date}
                onChange={(e) => setNewJob({ ...newJob, date: e.target.value })}
                margin="normal"
                InputLabelProps={{ shrink: true }}
                required
              />
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mt: 2 }}
              >
                Upload Files
                <input
                  type="file"
                  hidden
                  onChange={(e) => setNewJob({ ...newJob, files: e.target.files[0] })}
                />
              </Button>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenJobForm(false)}>Cancel</Button>
              <Button type="submit" variant="contained" sx={{ bgcolor: CAMP_LOGO_COLOR }}>
                Post Job
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </Box>
  );
} 