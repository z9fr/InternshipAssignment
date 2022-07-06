export interface RowData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  mobile: number;
  status: boolean;
  password: string;
  accountType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TableSortProps {
  data: RowData[];
  refetch: any;
}

export interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}
