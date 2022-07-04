import { showNotification } from "@mantine/notifications";

interface ICreateNotification {
  title: string;
  message?: string;
  color?: string;
}

export const displayNotification = (values: ICreateNotification) => {
  showNotification({
    title: values.title,
    message: values?.message,
    color: values?.color,
  });
};
