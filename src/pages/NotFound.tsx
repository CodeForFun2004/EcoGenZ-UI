import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'white',
        textAlign: 'center',
        px: 2,
      }}
    >
      {/* Background illustration */}
      <Box
        component="img"
        src="https://img.freepik.com/vecteurs-premium/erreur-404-illustration-concept-personne-fatiguee_114360-7899.jpg?semt=ais_hybrid&w=740"
        alt="404 illustration"
        sx={{
          maxWidth: '400px',
          width: '100%',
          mb: 4,
        }}
      />

      {/* Text */}
      <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#3CC78F' }}>
        Oops! Nothing Here...
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '500px', mb: 4 }}>
        Uh oh, we can't seem to find the page you're looking for.
        Try going back to the previous page or contact us for more information.
      </Typography>

      {/* Button */}
      <Button
        variant="contained"
        sx={{
          bgcolor: '#3CC78F',
          '&:hover': { bgcolor: '#34b57f' },
          borderRadius: '25px',
          px: 4,
          py: 1.5,
          textTransform: 'none',
          fontWeight: 'bold',
          boxShadow: 3,
        }}
        onClick={() => navigate('/')}
      >
        Go Back
      </Button>
    </Box>
  );
};

export default NotFound;
