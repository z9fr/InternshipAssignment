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

// react query
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const queryClient = new QueryClient();
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
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
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
