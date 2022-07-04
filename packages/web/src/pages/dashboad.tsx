import {
  Input,
  Button,
  Textarea,
  SimpleGrid,
  Paper,
  Text,
  Container,
  UnstyledButton,
} from "@mantine/core";
import { useNotes } from "../query-hooks/notes";
import { NoteCard } from "../components/Notes/cart";
import { INote } from "../types/notes";
import { useState } from "react";

export const Dashboard = () => {
  const notes = useNotes();
  const [createNote, setCreateNote] = useState(false);

  return (
    <>
      <Container size={500} p={10}>
        <Paper withBorder>
          {createNote ? (
            <>
              <Input
                variant="unstyled"
                pl={10}
                placeholder="Title"
                size={"md"}
              />

              <Textarea
                variant="unstyled"
                pl={10}
                placeholder="Take note..."
                size="sm"
                autosize
                minRows={3}
              />

              <Button variant="default" compact uppercase ml={10} mb={10}>
                Save
              </Button>
            </>
          ) : (
            <>
              <Input
                variant="unstyled"
                pl={10}
                size={"md"}
                placeholder="Take note..."
                onClick={() => setCreateNote(true)}
              />
            </>
          )}
        </Paper>
      </Container>

      <SimpleGrid
        cols={4}
        mt={30}
        spacing="lg"
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {notes.isLoading && <> Loading </>}
        {notes.isError && (
          <>
            <Text p={20}>{notes.error.message}</Text>
          </>
        )}

        {notes.isSuccess && (
          <>
            {notes.data?.length < 1 ? (
              <>
                <Text p={20} size="lg" weight={500}>
                  no notes found.
                </Text>
              </>
            ) : (
              <>
                {notes.data?.map((note: INote) => {
                  return <NoteCard note={note} />;
                })}
              </>
            )}
          </>
        )}
      </SimpleGrid>
    </>
  );
};
