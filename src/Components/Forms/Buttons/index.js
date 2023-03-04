import * as React from 'react';
import Button from '@mui/material/Button';

export default function CustomButton({title, onClick, testid}) {
  return (
    <Button
      sx={{
        backgroundColor: '#10ac84',
        color: '#ffffff',
        textTransform: 'capitalize',
        fontFamily: 'inherit',
        borderRadius: '40px',
        height: '45px',
        '&:hover': {
          backgroundColor: '#0b755a',
        },
      }}
      size='large'
      data-testid={testid}
      fullWidth
      onClick={onClick}
      variant='contained'
      type='submit'
    >
      {title}
    </Button>
  );
}
