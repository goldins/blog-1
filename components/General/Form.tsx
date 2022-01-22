import styled from '@emotion/styled';

export const FormContainer = styled('form')(
  {
    display: 'flex',
    flexDirection: 'column',
    padding: `1rem`,
    marginBottom: `1rem`,
    '& input': {
      marginBottom: '.5rem'
    }
  },
  ({ theme }) => ({
    [`@media(max-width: ${theme.breakpoints.sm}px)`]: {
      marginBottom: 0,
      height: '40%',
      position: 'fixed',
      left: 0,
      width: '100%',
      overflow: 'scroll'
    }
  })
);
