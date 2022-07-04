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

interface INoteCard {
  note: INote;
}

export const NoteCard = (props: INoteCard) => {
  const [opened, setOpened] = useState(false);
  const [selectedNote, setSelectedNote] = useState<INote | undefined>();

  const form = useForm({
    initialValues: {
      title: selectedNote?.title,
      description: selectedNote?.description,
    },
  });

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
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
