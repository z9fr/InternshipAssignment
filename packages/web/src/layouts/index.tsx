import { useState, ReactNode } from "react";
import {
  Container,
  AppShell,
  Group,
  Button,
  Header,
  Aside,
  Text,
  MediaQuery,
  useMantineTheme,
} from "@mantine/core";
import { IsAdminUser } from "../auth/auth_token";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  showSiderbar: boolean | false;
}

export default function Layout(children: LayoutProps) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      aside={
        <>
          {children.showSiderbar ? (
            <>
              <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                <Aside
                  p="md"
                  hiddenBreakpoint="sm"
                  width={{ sm: 200, lg: 300 }}
                >
                  <Text>Application sidebar</Text>
                </Aside>
              </MediaQuery>
            </>
          ) : null}
        </>
      }
      header={
        <Header height={70} p="md">
          <Group position="apart">
            <Text component={Link} to="/">
              The Notes
            </Text>
            {IsAdminUser() ? (
              <>
                <Button
                  sx={{ height: 30 }}
                  variant="default"
                  compact
                  component={Link}
                  to="/users"
                >
                  User Dashboard
                </Button>
              </>
            ) : null}
          </Group>
        </Header>
      }
    >
      <Container size={"xl"}>{children.children}</Container>
    </AppShell>
  );
}
