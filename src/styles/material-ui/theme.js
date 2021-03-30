import { createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

// a theme with custom primary and secondary color.
// it's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: blue[700],
      main: blue[900],
      dark: blue[900]
    }
  },
  typography: {
    useNextVariants: true
  }
});

export default theme;
