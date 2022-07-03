import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  firstName: string;

  @Column({ select: false })
  lastName: string | undefined;

  @Column()
  email: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column()
  mobile: number;

  @Column()
  status: boolean;

  @Column()
  password: string | undefined;

  @Column({
    type: "enum",
    enum: ["admin", "user"],
    default: "user",
  })
  accountType: string;
}
