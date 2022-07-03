import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  mobile: number;

  @Column()
  status: boolean;

  @Column()
  password: string;
}
