import {
  Input,
  Button,
  Textarea,
  SimpleGrid,
  Paper,
  Text,
  Container,
} from "@mantine/core";
import { useNotes } from "../query-hooks/notes";
import { NoteCard } from "../components/Notes/cart";
import { INote } from "../types/notes";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { displayNotification } from "../utils/showNotification";

import httpClient from "../http-common";
import { config } from "../config";

interface INoteCreate {
  title: string;
  description: string;
}

export const Dashboard = () => {
  const notes = useNotes();
  const [createNote, setCreateNote] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
  });

  const submitForm = (values: INoteCreate, notes: any) => {
    httpClient
      .post(`notes/create`, JSON.stringify(values))
      .then(function (response) {
        displayNotification({
          title: "Note created successfully",
          color: "teal",
          message: `note  ${values.title} created successfully`,
        });
      })
      .catch(function (error) {
        console.log(error);
        displayNotification({
          title: error.response.data?.message,
          message: error?.message,
          color: "red",
        });
      });

    notes.refetch();
  };

  return (
    <>
      <Container size={500} p={10}>
        <Paper withBorder>
          {createNote ? (
            <>
              <form
                onSubmit={form.onSubmit((values: INoteCreate) =>
                  submitForm(values, notes)
                )}
              >
                <Input
                  variant="unstyled"
                  pl={10}
                  placeholder="Title"
                  size={"md"}
                  {...form.getInputProps("title")}
                />

                <Textarea
                  variant="unstyled"
                  pl={10}
                  placeholder="Take note..."
                  size="sm"
                  autosize
                  minRows={3}
                  {...form.getInputProps("description")}
                />

                <Button
                  variant="default"
                  compact
                  uppercase
                  ml={10}
                  mb={10}
                  type="submit"
                >
                  Save
                </Button>
              </form>
            </>
          ) : (
            <>
              <Input
                variant="unstyled"
                pl={10}
                size={"md"}
                placeholder="Take note..."
                {...form.getInputProps("title")}
                onMouseEnter={() => setCreateNote(true)}
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
        onMouseEnter={() => setCreateNote(false)}
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
