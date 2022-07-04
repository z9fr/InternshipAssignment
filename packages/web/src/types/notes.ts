export interface INote {
  _id: string;
  title: string;
  description: string;
  ownedBy: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
