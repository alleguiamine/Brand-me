import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import SwipeableViews from 'react-swipeable-views';

function Header() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <SwipeableViews index={index}>
        <Box
          component="img"
          src="/images/start2.jpg"
          alt="First slide"
          sx={{ width: '100%', height: '70%', objectFit: 'cover' }}
        />
        <Box
          component="img"
          src="/images/start.jpg" // Assuming the images are located in public/images
          alt="Second slide"
          sx={{ width: '100%', height: '70%', objectFit: 'cover' }}
        />
        <Box
          component="img"
          src="/images/start3.jpg"
          alt="Third slide"
          sx={{ width: '100%', height: '70%', objectFit: 'cover' }}
        />
      </SwipeableViews>
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, textAlign: 'center', paddingY: 4 }}>
        <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>VOTRE CADEAU EXCEPTIONNEL</Typography>
      </Box>
    </Box>
  );
}

export default Header;
