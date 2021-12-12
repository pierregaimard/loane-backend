import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 60, nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  lastName: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
