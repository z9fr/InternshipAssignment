import {
  TextInput,
  PasswordInput,
  Checkbox,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";

interface IUserLogin {
  email: string;
  password: string;
}

export function UserLogin() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleLogin = (values: IUserLogin) => {
    alert(JSON.stringify(values));
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        mt={150}
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Please login using your email and password
      </Text>

      <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            {...form.getInputProps("password")}
            mt="md"
          />

          <Group position="apart" mt="md">
            <Checkbox label="Remember me" />
          </Group>
          <Button fullWidth mt={30} type="submit">
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  );
}
