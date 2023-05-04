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
<Box sx={{
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#f0f0f0",
  padding: "16px",
  marginBottom: '80px',
  minWidth: "100%",
  "@media screen and (max-width: 700px)": {
    marginTop: '105px',
  },
}}>
  <img src={CommessaIcon} alt="commessa" width={100} />
  <h1 style={{ marginLeft: "16px", fontSize: "24px" }}>Generatore codice commesse</h1>
</Box>
    </Box>
  );
};

export default BannerBackground;
