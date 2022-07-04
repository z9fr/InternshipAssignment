import { SimpleGrid, Paper, Text } from "@mantine/core";

export const Dashboard = () => {
  return (
    <>
      <h1> Dashboard </h1>

      <SimpleGrid
        cols={6}
        spacing="lg"
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        <NoteCard />
      </SimpleGrid>
    </>
  );
};

const NoteCard = () => {
  return (
    <Paper shadow="xs" p="md">
      <Text>Paper is the most basic ui component</Text>
      <Text>
        Use it to create cards, dropdowns, modals and other components that
        require background with shadow
      </Text>
    </Paper>
  );
};
