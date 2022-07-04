import { useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";

// routes
import { BrowserRouter } from "react-router-dom";
import { ApplicationRouter } from "./Router";

// notifications
import { NotificationsProvider } from "@mantine/notifications";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <BrowserRouter>
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <NotificationsProvider position="bottom-left">
            <ApplicationRouter />
          </NotificationsProvider>
        </ColorSchemeProvider>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
