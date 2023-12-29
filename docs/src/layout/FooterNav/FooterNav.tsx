import { Box, Container } from '@mantine/core';
import classes from './FooterNav.module.css';

const FooterNav = () => (
  <Box>
    <footer className={classes.footer}>
      <Container className={classes.inner} fluid>
        <p>
          © 2024{' '}
          <a href="https://www.vinta.com.br" target="_blank">
            Vinta Software
          </a>{' – '}
          <a href="https://www.vinta.com.br" target="_blank">meet the creators!</a>
        </p>
      </Container>
    </footer>
  </Box>
);

export default FooterNav;
