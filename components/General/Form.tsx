import styled from '@emotion/styled';

export const FormContainer = styled('form')(
  {
    display: 'flex',
    flexDirection: 'column',
    padding: `1rem`,
    marginBottom: `1rem`
  },
  ({ theme }) => ({
    [`@media(max-width: ${theme.breakpoints.sm}px)`]: {
      marginBottom: 0,
      position: 'fixed',
      left: 0,
      width: '100%',
      overflow: 'auto'
    }
  })
);
