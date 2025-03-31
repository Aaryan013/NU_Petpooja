import { Typography, Box } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { keyframes } from '@emotion/react';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Logo = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        '&:hover .logo-icon': {
          animation: `${rotate} 1s ease-in-out`,
        },
      }}
    >
      <RestaurantIcon
        className="logo-icon"
        sx={{
          fontSize: '2rem',
          color: 'primary.main',
        }}
      />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Smart Kitchen
      </Typography>
    </Box>
  );
};

export default Logo; 