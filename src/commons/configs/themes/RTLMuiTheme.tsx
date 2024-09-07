import { createTheme } from '@mui/material';
import { Workshop } from './MuiVariables';
import theme from './theme';
import typography from './typography';
import { faIR } from '@mui/material/locale';

const RTLMuiTheme = createTheme({
  direction: 'rtl',
  ...theme(Workshop),
  typography,
}, faIR);

export default RTLMuiTheme;
