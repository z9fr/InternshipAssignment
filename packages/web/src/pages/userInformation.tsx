import { UsersTable } from "../components/Users/table";
import { Title } from "@mantine/core";
const data = [
  {
    _id: "62c36fecf1b2e13c5479774a",
    firstName: "john",
    lastName: "Doe",
    email: "admin@localhost.com",
    dateOfBirth: "2022-07-03T13:43:55.000Z",
    mobile: 123,
    status: false,
    password: "$2b$10$/Xl1hibSv3TdSZJ1HJmD/Oz9obF85OIXdsz1md6nGycr3T5QFtf/q",
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
    password: "$2b$10$MtLPoA9SB5c0J9v.LWpPA./N528ZN0UiCXVMTKTXzx89iVEyZTI.a",
    accountType: "user",
    createdAt: "2022-07-04T22:08:03.453Z",
    updatedAt: "2022-07-04T22:08:03.453Z",
    __v: 0,
  },
];

export const UserInformation = () => {
  return (
    <>
      <Title order={1} mb={20} mt={20}>
        User Details
      </Title>

      <UsersTable data={data} />
    </>
  );
};
