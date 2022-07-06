import React from "react";
import {
  createStyles,
  PasswordInput,
  Paper,
  Title,
  Text,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
} from "@mantine/core";
import { ArrowLeft } from "tabler-icons-react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "@mantine/form";
import axios from "axios";
import { config as AppConfig } from "../config";
import { displayNotification } from "../utils/showNotification";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
}));

interface Ivalues {
  newPassword: string;
  oldPassword: string;
}

export const Verify = () => {
  const { classes } = useStyles();
  const [searchParams, _setSearchParams] = useSearchParams();

  const userID = searchParams.get("id");
  const token = searchParams.get("token");

  const submitForm = (values: Ivalues) => {
    let config = {
      method: "patch",
      url: `${AppConfig.apiUrl}users/reset/${userID}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(values),
    };

    axios(config)
      .then(function (response) {
        displayNotification({
          title: "Password updated successfully",
          color: "teal",
          message: `Password updated`,
        });
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        displayNotification({
          title: error.response.data?.message,
          message: error?.message,
          color: "red",
        });
        console.log(error);
      });
  };

  const form = useForm({
    initialValues: {
      newPassword: "",
      oldPassword: token,
    },
  });

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        Set a new Password
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Setup a new password for your account to login
      </Text>

      <form onSubmit={form.onSubmit((values) => submitForm(values))}>
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <PasswordInput
            label="Password"
            placeholder="password"
            required
            {...form.getInputProps("newPassword")}
          />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <ArrowLeft size={12} />
                <Box ml={5}>Back to Home page</Box>
              </Center>
            </Anchor>
            <Button className={classes.control} type="submit">
              Reset password
            </Button>
          </Group>
        </Paper>
      </form>
    </Container>
  );
};
