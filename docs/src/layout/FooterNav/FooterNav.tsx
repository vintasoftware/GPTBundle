import { Box, Link } from '@mui/material';
import { grey } from '@mui/material/colors';

const FooterNav = () => (
  <Box sx={{ position: 'sticky', bottom: 0, backgroundColor: '#fff', borderTop: `1px solid ${grey[300]}` }}>
    <Box component="footer">
      <Box display="flex" alignItems="center" height={60} paddingX={4} gap={0.5}>
        © 2024
        <Link href="https://www.vinta.com.br" target="_blank">
          Vinta Software
        </Link>
        {' – '}
        <Link href="https://www.vinta.com.br" target="_blank">
          meet the creators!
        </Link>
      </Box>
    </Box>
  </Box>
);

export default FooterNav;
