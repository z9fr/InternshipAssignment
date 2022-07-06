import {
  Paper,
  Text,
  Input,
  Title,
  Modal,
  Button,
  Textarea,
} from "@mantine/core";
import { useState } from "react";
import { INote } from "../../types/notes";
import { useForm } from "@mantine/form";

import httpClient from "../../http-common";
import { displayNotification } from "../../utils/showNotification";
import { useMutation } from "react-query";

interface INoteCard {
  note: INote;
}

interface INoteEdit {
  _id: string;
  title: string;
  description: string;
}

export const NoteCard = (props: INoteCard) => {
  const [opened, setOpened] = useState(false);
  const [selectedNote, setSelectedNote] = useState<INote | undefined>();

  const mutation = useMutation((updateNote: INoteEdit) => {
    return httpClient.put(`notes/update/${props?.note._id}`, updateNote);
  });

  const form = useForm({
    initialValues: {
      _id: selectedNote?._id,
      title: selectedNote?.title,
      description: selectedNote?.description,
    },
  });

  const handleFormSubmission = async (values: INoteEdit) => {
    try {
      const data = await mutation.mutateAsync(values);

      displayNotification({
        title: "Note updated successfully",
        color: "teal",
        message: `details of ${values?.title} updated successfully`,
      });
    } catch (err) {
      displayNotification({
        title: "Error!",
        message: err?.message,
        color: "red",
      });
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size={"lg"}
        withCloseButton={false}
        padding={0}
        radius="md"
        style={{
          marginTop: 100,
        }}
      >
        <form
          onSubmit={form.onSubmit((values) => handleFormSubmission(values))}
        >
          <Paper shadow="sm" p="sm" withBorder>
            <Input
              variant="unstyled"
              size="lg"
              placeholder="Title"
              defaultValue={selectedNote?.title}
              {...form.getInputProps("title")}
            />

            <Textarea
              variant="unstyled"
              placeholder="Take note..."
              defaultValue={selectedNote?.description}
              autosize
              minRows={4}
              {...form.getInputProps("description")}
            />

            <Button
              variant="default"
              color="lime"
              compact
              uppercase
              type="submit"
            >
              Save
            </Button>
          </Paper>
        </form>
      </Modal>
      <Paper
        p="sm"
        withBorder
        m={1}
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          setSelectedNote(props.note);
          setOpened(true);
        }}
      >
        <Title mb={10} order={4}>
          {props.note?.title}
        </Title>

        <Text lineClamp={5}>{props.note?.description}</Text>
      </Paper>
    </>
  );
};
