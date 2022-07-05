import { Paper, TextInput, Button, SimpleGrid } from "@mantine/core";
import { IUser } from "../../types/users";
import { CalendarTime, Mail, Phone } from "tabler-icons-react";
import { useForm } from "@mantine/form";

export interface IUserDetails {
  user: IUser;
}

interface IUpdateDetails {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  mobile: number;
  accountType: string;
}

const handleSubmission = (values: IUpdateDetails) => {
  console.log(JSON.stringify(values));
};

export const UpdateUserDetails = ({ user }: IUserDetails) => {
  const form = useForm({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      dateOfBirth: user?.dateOfBirth,
      mobile: user?.mobile,
      accountType: user?.accountType,
    },
  });

  return (
    <Paper shadow="sm" p="md" withBorder>
      <form
        onSubmit={form.onSubmit((values: IUpdateDetails) =>
          handleSubmission(values)
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
          />

          <TextInput
            required
            mt={10}
            label="Last name"
            placeholder="Your last name"
            defaultValue={user?.lastName}
            variant="default"
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
        />

        <TextInput
          mt={10}
          label="Date of birth"
          type="date"
          variant="default"
          defaultValue={user?.dateOfBirth}
          icon={<CalendarTime size={14} />}
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
