import React from "react";
import {
  createStyles,
  Badge,
  Card,
  Avatar,
  Text,
  Group,
  Button,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    width: 300,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `2px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

interface UserCardImageProps {
  name: string;
  email: string;

  _id: string;
  dateOfBirth?: string;
  mobile?: number;
  status?: boolean;
  password?: string;
  accountType?: string;
  createdAt?: string;
  updatedAt?: string;
  image: string;
}

export function UserCardImage(props: UserCardImageProps) {
  const { classes, theme } = useStyles();

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <Card.Section
        sx={{
          backgroundImage: `url(${props.image})`,
          height: 80,
        }}
      />
      <Avatar
        size={80}
        radius={80}
        mx="auto"
        mt={-30}
        className={classes.avatar}
      />

      <Group
        position="apart"
        style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
      >
        <Text align="center" size="lg" weight={500} mt="sm">
          {props.name}
        </Text>
        <Badge color="pink" variant="light">
          {props?.accountType}
        </Badge>

        <Text size="sm">
          Email - {props.email} <br />
          UserID - {props?._id} <br />
          Phone - {props?.mobile}
        </Text>

        <Text size="xs" color="dimmed">
          Joined on :{new Date(props?.createdAt!).toLocaleDateString("en-US")}
        </Text>
      </Group>
    </Card>
  );
}
