import {
  Paper,
  TextInput,
  Button,
  SimpleGrid,
  NativeSelect,
} from "@mantine/core";
import { IUser } from "../../types/users";
import { CalendarTime, Mail, Phone } from "tabler-icons-react";
import { useForm } from "@mantine/form";
import httpClient from "../../http-common";
import { displayNotification } from "../../utils/showNotification";
import { useUsers } from "../../query-hooks/users/useUsers";

export interface IUserDetails {
  user: IUser;
  isEditMode: Boolean;
}

interface IUpdateDetails {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  mobile: number;
  accountType: string;
}

const handleSubmission = (
  values: IUpdateDetails,
  isEdit: Boolean,
  userinformation: any
) => {
  if (isEdit) {
    httpClient
      .put(`users/update/${values?._id}`, JSON.stringify(values))
      .then(function (response) {
        displayNotification({
          title: "User updated successfully",
          color: "teal",
          message: `details of ${values.firstName} updated successfully`,
        });
        console.log(JSON.stringify(response.data));
        userinformation.refetch();
      })
      .catch(function (error) {
        console.log(error);
        displayNotification({
          title: error.response.data?.message,
          message: error?.message,
          color: "red",
        });
      });
  } else {
    httpClient
      .post("/users/create", JSON.stringify(values))
      .then(function (response) {
        displayNotification({
          title: "User created success",
          color: "teal",
          message: `new user ${values.firstName} added success`,
        });
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
        displayNotification({
          title: error.response.data?.message,
          message: error?.message,
          color: "red",
        });
      });
  }

  userinformation.refetch();
};

export const UpdateUserDetails = ({ user, isEditMode }: IUserDetails) => {
  const form = useForm({
    initialValues: {
      _id: user?._id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      dateOfBirth: user?.dateOfBirth,
      mobile: user?.mobile,
      accountType: user?.accountType,
    },
  });

  const userinformation = useUsers();

  return (
    <Paper shadow="sm" p="md" withBorder>
      <form
        onSubmit={form.onSubmit((values: IUpdateDetails) =>
          handleSubmission(values, isEditMode, userinformation)
        )}
      >
        <SimpleGrid cols={2}>
          <TextInput
            required
            mt={10}
            label="First name "
            placeholder="Your first name"
            defaultValue={user?.firstName}
            variant="default"
            {...form.getInputProps("firstName")}
          />

          <TextInput
            required
            mt={10}
            label="Last name"
            placeholder="Your last name"
            defaultValue={user?.lastName}
            variant="default"
            {...form.getInputProps("lastName")}
          />
        </SimpleGrid>

        <TextInput
          mt={10}
          required
          label="Email"
          placeholder="Your email"
          defaultValue={user?.email}
          variant="default"
          icon={<Mail size={14} />}
          {...form.getInputProps("email")}
        />

        <NativeSelect
          data={["admin", "user"]}
          placeholder="Account type"
          label="Account type"
          required
          {...form.getInputProps("accountType")}
        />

        <TextInput
          mt={10}
          required
          label="Mobile number"
          type="number"
          placeholder="Your mobile number"
          variant="default"
          defaultValue={user?.mobile}
          icon={<Phone size={14} />}
          {...form.getInputProps("mobile")}
        />

        <TextInput
          mt={10}
          label="Date of birth"
          type="date"
          variant="default"
          defaultValue={user?.dateOfBirth}
          icon={<CalendarTime size={14} />}
          {...form.getInputProps("dateOfBirth")}
        />

        <Button
          variant="default"
          color="lime"
          fullWidth
          uppercase
          type="submit"
          mt={15}
        >
          Save
        </Button>
      </form>
    </Paper>
  );
};
