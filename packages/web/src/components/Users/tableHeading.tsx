import { useStyles } from "./styles";

import { UnstyledButton, Group, Text, Center } from "@mantine/core";

import { ThProps } from "../../types/userTable";

// icons
import { Selector, ChevronDown, ChevronUp } from "tabler-icons-react";

export function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : Selector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}
