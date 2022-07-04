import { useState, ReactNode } from "react";
import {
  Container,
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";

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
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Application header</Text>
          </div>
        </Header>
      }
    >
      <Container size={"xl"}>{children.children}</Container>
    </AppShell>
  );
}
