import React from 'react';
import { Box } from '@mui/material';
import CommessaIcon from '../assets/images/commessa.png';

 // backgroundImage: `url(${Banner}) `,

const BannerBackground = () => {
  return (
    <Box
      sx={{
        height: '30vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& h1': {
          fontSize: '4rem',
          fontWeight: 700,
          color: 'black',
          padding: '10px',
        },
        '@media (max-width: 600px)': {
          height: '15vh',
          '& h1': {
            fontSize: '2rem',
            padding: '10px',
          },
          
        },
      }}
    >
      <img src={CommessaIcon} alt="commessa" width={100}/><h1>Generatore codice commesse</h1>
    </Box>
  );
};

export default BannerBackground;
