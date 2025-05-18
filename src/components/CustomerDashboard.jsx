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
  Toolbar,
  Chip,
  Stack
} from '@mui/material';
import { Add as AddIcon, Menu as MenuIcon, AttachFile as AttachFileIcon } from '@mui/icons-material';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

const CAMP_LOGO_COLOR = '#2563eb';

const projectTypes = [
  'EV Charger Installation',
  'Solar Panel Installation',
  'Battery Storage System',
  'General Electrical Work',
  'Panel Upgrade',
  'Emergency Service'
];

const jobStatuses = {
  OPEN: 'open',
  NEGOTIATING: 'negotiating',
  AWARDED: 'awarded',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
};

export default function CustomerDashboard() {
  const [openJobForm, setOpenJobForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    type: '',
    location: {
      zip: '',
      city: '',
      state: ''
    },
    startDate: '',
    endDate: '',
    files: [],
    status: jobStatuses.OPEN
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
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

  const handleFileUpload = async (files) => {
    const uploadedUrls = [];
    for (const file of files) {
      const storageRef = ref(storage, `job-files/${auth.currentUser.uid}/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      uploadedUrls.push({
        name: file.name,
        url: url
      });
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    try {
      // Upload files first
      const fileUrls = await handleFileUpload(uploadedFiles);

      const jobData = {
        ...newJob,
        customerId: auth.currentUser.uid,
        status: jobStatuses.OPEN,
        createdAt: serverTimestamp(),
        customerName: auth.currentUser.displayName || 'Anonymous',
        files: fileUrls
      };

      await addDoc(collection(db, 'jobs'), jobData);
      setOpenJobForm(false);
      setNewJob({
        title: '',
        description: '',
        type: '',
        location: {
          zip: '',
          city: '',
          state: ''
        },
        startDate: '',
        endDate: '',
        files: [],
        status: jobStatuses.OPEN
      });
      setUploadedFiles([]);
      fetchJobs();
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      [jobStatuses.OPEN]: 'primary',
      [jobStatuses.NEGOTIATING]: 'info',
      [jobStatuses.AWARDED]: 'success',
      [jobStatuses.IN_PROGRESS]: 'warning',
      [jobStatuses.COMPLETED]: 'success'
    };
    return colors[status] || 'default';
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
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6">{job.title}</Typography>
                    <Chip 
                      label={job.status.replace('_', ' ')} 
                      color={getStatusColor(job.status)}
                      size="small"
                    />
                  </Box>
                  <Typography color="text.secondary" gutterBottom>{job.type}</Typography>
                  <Typography variant="body2" paragraph>{job.description}</Typography>
                  <Stack direction="row" spacing={1} mb={1}>
                    <Typography variant="caption" color="text.secondary">
                      Location: {job.location.city}, {job.location.state} {job.location.zip}
                    </Typography>
                  </Stack>
                  {job.files && job.files.length > 0 && (
                    <Stack direction="row" spacing={1}>
                      {job.files.map((file, index) => (
                        <Chip
                          key={index}
                          icon={<AttachFileIcon />}
                          label={file.name}
                          size="small"
                          onClick={() => window.open(file.url, '_blank')}
                        />
                      ))}
                    </Stack>
                  )}
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
                label="Project Type"
                value={newJob.type}
                onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                margin="normal"
                required
              >
                {projectTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="ZIP Code"
                    value={newJob.location.zip}
                    onChange={(e) => setNewJob({ 
                      ...newJob, 
                      location: { ...newJob.location, zip: e.target.value }
                    })}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="City"
                    value={newJob.location.city}
                    onChange={(e) => setNewJob({ 
                      ...newJob, 
                      location: { ...newJob.location, city: e.target.value }
                    })}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="State"
                    value={newJob.location.state}
                    onChange={(e) => setNewJob({ 
                      ...newJob, 
                      location: { ...newJob.location, state: e.target.value }
                    })}
                    required
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="date"
                    value={newJob.startDate}
                    onChange={(e) => setNewJob({ ...newJob, startDate: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="End Date"
                    type="date"
                    value={newJob.endDate}
                    onChange={(e) => setNewJob({ ...newJob, endDate: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
              </Grid>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mt: 2 }}
                startIcon={<AttachFileIcon />}
              >
                Upload Files
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={(e) => {
                    setUploadedFiles(Array.from(e.target.files));
                  }}
                />
              </Button>
              {uploadedFiles.length > 0 && (
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  {uploadedFiles.map((file, index) => (
                    <Chip
                      key={index}
                      label={file.name}
                      onDelete={() => {
                        setUploadedFiles(files => files.filter((_, i) => i !== index));
                      }}
                    />
                  ))}
                </Stack>
              )}
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