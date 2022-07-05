import { UsersTable } from "../components/Users/table";
import { Title } from "@mantine/core";
import { useUsers } from "../query-hooks/users/useUsers";

import { TableSort } from "../components/Users/searchTable";

const info = [
  {
    _id: "62c36fecf1b2e13c5479774a",
    firstName: "john",
    lastName: "Doe",
    email: "admin@localhost.com",
    dateOfBirth: "2022-07-03T13:43:55.000Z",
    mobile: 123,
    status: false,
    accountType: "admin",
    createdAt: "2022-07-04T22:55:40.128Z",
    updatedAt: "2022-07-04T22:55:40.128Z",
    __v: 0,
  },
  {
    _id: "62c364c351fe82634c3a66a2",
    firstName: "john",
    lastName: "Doe",
    email: "dasith@localhost.com",
    dateOfBirth: "2022-07-03T13:43:55.000Z",
    mobile: 123,
    status: false,
    accountType: "user",
    createdAt: "2022-07-04T22:08:03.453Z",
    updatedAt: "2022-07-04T22:08:03.453Z",
    __v: 0,
  },
];

export const UserInformation = () => {
  const users = useUsers();
  return (
    <>
      <Title order={1} mb={20} mt={20}>
        User Details
      </Title>

      {users.isLoading && <> Loading </>}
      {users.isError && (
        <>
          <Text p={20}>{users.error.message}</Text>
        </>
      )}

      {users.isSuccess && (
        <>
          <UsersTable data={users.data} />
        </>
      )}

      <br />
      <TableSort data={info} />
    </>
  );
};
