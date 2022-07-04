import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
} from "@mantine/core";
import { Pencil, Trash } from "tabler-icons-react";
import { IUsersTableProps } from "../../types/users";

export function UsersTable({ data }: IUsersTableProps) {
  const theme = useMantineTheme();
  const rows = data.map((item) => (
    <tr key={item?._id}>
      <td>
        <Group spacing="sm">
          <Avatar size={30} radius={30} />
          <Text size="sm" weight={500}>
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
            <Pencil size={16} />
          </ActionIcon>
          <ActionIcon color="red">
            <Trash size={16} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
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
  );
}
