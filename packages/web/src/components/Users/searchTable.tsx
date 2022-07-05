import React, { useState } from "react";
import {
  ActionIcon,
  Modal,
  Badge,
  Anchor,
  Table,
  ScrollArea,
  Group,
  Text,
  TextInput,
} from "@mantine/core";

// icons
import { Pencil, Trash, Search } from "tabler-icons-react";

// types
import { RowData, TableSortProps, ThProps } from "../../types/userTable";
import { IUser } from "../../types/users";

// components
import { UpdateUserDetails } from "./editUser";
import { Th } from "./tableHeading";

// helpr
import { sortData } from "./sortData";

export function TableSort({ data }: TableSortProps) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const [opened, setOpened] = useState(false);
  const [previewUser, setPreviewUser] = useState<IUser | undefined>();

  const showEditor = (user: IUser) => {
    setPreviewUser(user);
    setOpened(true);
  };

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const rows = sortedData.map((row) => (
    <tr key={row._id}>
      <td>
        <Text size="sm">{row._id}</Text>
      </td>
      <td>{row.firstName}</td>
      <td> {row.lastName}</td>
      <td>
        <Badge>{row.accountType}</Badge>{" "}
      </td>
      <td>
        <Anchor<"a">
          size="sm"
          href="#"
          onClick={(event) => event.preventDefault()}
        >
          {row.email}
        </Anchor>
      </td>

      <td>
        <Group spacing={0} position="right">
          <ActionIcon>
            <Pencil size={16} onClick={() => showEditor(row)} />
          </ActionIcon>
          <ActionIcon color="red">
            <Trash size={16} />
          </ActionIcon>
        </Group>
      </td>
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
        <TextInput
          variant="default"
          size="md"
          placeholder="Search by any field"
          mb={20}
          icon={<Search size={14} />}
          value={search}
          onChange={handleSearchChange}
        />
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          sx={{ tableLayout: "fixed", minWidth: 700 }}
        >
          <thead>
            <tr>
              <Th
                sorted={sortBy === "_id"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("_id")}
              >
                ID
              </Th>
              <Th
                sorted={sortBy === "firstName"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("firstName")}
              >
                First Name
              </Th>

              <Th
                sorted={sortBy === "lastName"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("lastName")}
              >
                Last Name
              </Th>

              <Th
                sorted={sortBy === "email"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("email")}
              >
                Account type
              </Th>

              <Th
                sorted={sortBy === "email"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("email")}
              >
                Email
              </Th>

              <Th> Action </Th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={Object.keys(data[0]).length}>
                  <Text weight={500} align="center">
                    Nothing found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
