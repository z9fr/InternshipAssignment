import { Title } from "@mantine/core";
import { useUsers } from "../query-hooks/users/useUsers";

import { TableSort } from "../components/Users/searchTable";

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
          <TableSort />
        </>
      )}

      <br />
    </>
  );
};
