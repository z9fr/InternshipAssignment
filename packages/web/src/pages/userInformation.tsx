import { UsersTable } from "../components/Users/table";
import { Title } from "@mantine/core";
import { useUsers } from "../query-hooks/users/useUsers";

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
    </>
  );
};
