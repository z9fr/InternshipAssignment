import React, { useState } from "react";
import {
  ActionIcon,
  Popper,
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
import { RowData, TableSortProps } from "../../types/userTable";
import { IUser } from "../../types/users";

// components
import { UpdateUserDetails } from "./editUser";
import { Th } from "./tableHeading";
import { UserCardImage } from "./userDetails";

// helpr
import { sortData } from "./sortData";

export function TableSort({ data }: TableSortProps) {
  // seach , sort and reverse
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  // user model
  const [opened, setOpened] = useState(false);
  const [previewUser, setPreviewUser] = useState<IUser | undefined>();

  // user details preview
  const [visible, setVisible] = useState(false);
  const [referenceElement, setReferenceElement] = useState<
    HTMLElement | undefined
  >();

  const showEditor = (user: IUser) => {
    setPreviewUser(user);

    setVisible(false);
    setOpened(true);
  };

  const showPreview = (user: IUser) => {
    setPreviewUser(user);
    setVisible(!visible);
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
    <tr
      key={row?._id}
      ref={setReferenceElement}
      onClick={() => showPreview(row)}
      style={{
        cursor: "pointer",
      }}
    >
      <td>
        <Text size="sm">{row._id}</Text>
      </td>
      <td
        onMouseEnter={() => showPreview(row)}
        onMouseLeave={() => setVisible(false)}
      >
        {row?.firstName}
      </td>
      <td> {row?.lastName}</td>
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
          <ActionIcon
            onMouseEnter={() => setVisible(false)}
            onMouseLeave={() => setVisible(false)}
          >
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
          horizontalSpacing="lg"
          verticalSpacing="sm"
          highlightOnHover
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
                sorted={sortBy === "accountType"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("accountType")}
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
    </>
  );
}
