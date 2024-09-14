// theme.ts
import { createTheme } from "@mui/material/styles";

// Create a custom theme that matches your Tailwind setup
const customTheme = createTheme({
  typography: {
    fontFamily: '"Inter Tight", sans-serif',
    h1: {
      fontFamily: '"Comfortaa", cursive',
    },
    h2: {
      fontFamily: '"Comfortaa", cursive',
    },
    h3: {
      fontFamily: '"Comfortaa", cursive',
    },
    h4: {
      fontFamily: '"Comfortaa", cursive',
    },
    h5: {
      fontFamily: '"Comfortaa", cursive',
    },
    h6: {
      fontFamily: '"Comfortaa", cursive',
    },
    body1: {
      fontFamily: '"Inter Tight", sans-serif',
    },
    body2: {
      fontFamily: '"Inter Tight", sans-serif',
    },
    button: {
      fontFamily: '"Inter Tight", sans-serif',
    },
  },
});

export default customTheme;
