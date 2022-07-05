import {
  Avatar,
  Badge,
  Modal,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
  Popper,
} from "@mantine/core";
import { Pencil, Trash } from "tabler-icons-react";
import { useState } from "react";

import { IUsersTableProps, IUser } from "../../types/users";
import { UpdateUserDetails } from "./editUser";
import { UserCardImage } from "./userDetails";

export function UsersTable({ data }: IUsersTableProps) {
  const [visible, setVisible] = useState(false);
  const [opened, setOpened] = useState(false);
  const [previewUser, setPreviewUser] = useState<IUser | undefined>();
  const [referenceElement, setReferenceElement] = useState<
    HTMLElement | undefined
  >();

  const showPreview = (user: IUser) => {
    setPreviewUser(user);
    setVisible(!visible);
  };

  const showEditor = (user: IUser) => {
    setPreviewUser(user);
    setOpened(true);
  };

  const theme = useMantineTheme();
  const rows = data.map((item) => (
    <tr key={item?._id} ref={setReferenceElement}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} radius={30} />

          <Text
            size="sm"
            weight={500}
            onClick={() => showPreview(item)}
            style={{
              cursor: "pointer",
            }}
          >
            {`${item?.firstName} ${item?.lastName}`}
          </Text>
        </Group>
      </td>

      <td>
        <Badge variant={theme.colorScheme === "dark" ? "light" : "outline"}>
          {item?.accountType}
        </Badge>
      </td>
      <td>
        <Anchor<"a">
          size="sm"
          href="#"
          onClick={(event) => event.preventDefault()}
        >
          {item.email}
        </Anchor>
      </td>
      <td>
        <Text size="sm" color="gray">
          {item?.mobile}
        </Text>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <Pencil size={16} onClick={() => showEditor(item)} />
          </ActionIcon>
          <ActionIcon color="red">
            <Trash size={16} />
          </ActionIcon>
        </Group>
      </td>
      <Group position="center">
        <Popper
          mounted={visible}
          referenceElement={referenceElement}
          position="bottom"
          placement="start"
          gutter={9}
          arrowSize={5}
          withArrow
          transition="pop"
          transitionDuration={150}
          transitionTimingFunction="ease"
        >
          <UserCardImage
            name={`${previewUser?.firstName} ${previewUser?.lastName}`}
            email={`${previewUser?.email}`}
            dateOfBirth={previewUser?.dateOfBirth}
            mobile={previewUser?.mobile}
            status={previewUser?.status}
            accountType={previewUser?.accountType}
            createdAt={previewUser?.createdAt}
            image={`https://picsum.photos/400/100/?blur`}
            _id={previewUser?._id}
          />
        </Popper>
      </Group>
    </tr>
  ));

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
        <UpdateUserDetails user={previewUser} />
      </Modal>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <thead>
            <tr>
              <th>User's name</th>
              <th>Account Type</th>
              <th>Email</th>
              <th>Phone</th>
              <th />
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
