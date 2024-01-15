import { Box, Link, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const FooterNav = () => (
  <Box sx={{ position: 'sticky', bottom: 0, backgroundColor: '#fff', borderTop: `1px solid ${grey[300]}`, zIndex: 1 }}>
    <Box component="footer" padding={3}>
      <Typography variant="body2" display="flex" alignItems="center" gap={0.5}>
        © 2024
        <Link href="https://www.vinta.com.br" target="_blank">
          Vinta Software
        </Link>
        {' – '}
        <Link href="https://www.vinta.com.br" target="_blank">
          meet the creators!
        </Link>
      </Typography>
    </Box>
  </Box>
);

export default FooterNav;
