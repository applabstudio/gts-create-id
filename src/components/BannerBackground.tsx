import React from 'react';
import { Box } from '@mui/material';
import Banner from '../assets/images/background.jpeg';
const BannerBackground = () => {
    return (
        <Box
        sx={{
          height: '20vh',
          backgroundImage: `url(${Banner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '& h1': {
            fontSize: '4rem',
            fontWeight: 700,
            color: 'black',
            backgroundColor: 'rgba(255,255,255,0.7)',
            borderRadius: '10px',
            padding: '20px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.3)',
          },
        }}
      >
        <h1>Genera il codice commessa</h1>
      </Box>
      );
  };
  
  export default BannerBackground;