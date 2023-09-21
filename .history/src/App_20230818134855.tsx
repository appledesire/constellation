import * as React from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import Main from "@pages/Main";
import theme from "@theme/index";

function App() {
  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline />
      <Main />
    </ThemeProvider>
  );
}

export default App;
