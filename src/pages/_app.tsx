import { createTheme, NextUIProvider } from "@nextui-org/react";
import RedirectAnim from "Animations/RedirectAnim";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import Zoom from "../Animations/notistack/Zoom";
import AppNavbar from "../Components/AppNavbar";
import { PresencesProvider } from "../Contexts/PresenceContext";
import "./styles.css";

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      background: "#282a36",
    },
  },
});

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextThemesProvider
      defaultTheme="dark"
      attribute="class"
      value={{
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          TransitionComponent={Zoom}
        >
          <AppNavbar>
            <PresencesProvider>
              <RedirectAnim>
                <Component {...pageProps} />
              </RedirectAnim>
            </PresencesProvider>
          </AppNavbar>
        </SnackbarProvider>
      </NextUIProvider>
    </NextThemesProvider>
  );
}
