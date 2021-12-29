import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 60, nullable: false, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @Column({ type: 'varchar', length: 60, nullable: false, unique: true })
  @IsNotEmpty()
  @Length(3, 60)
  @Matches(/^[a-zA-Z][a-zA-Z0-9]{2,}$/, {
    message: '$property Should only contain letters and numbers',
  })
  username?: string;

  @Column({ type: 'varchar', nullable: false })
  @IsNotEmpty()
  @Length(3, 60)
  @IsString()
  password?: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]+(-?[a-zA-Z])*$/, {
    message: '$property Should only contain letters and dashes',
  })
  firstName?: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]+(-?[a-zA-Z])*$/, {
    message: '$property Should only contain letters and dashes',
  })
  lastName?: string;

  @Column({ type: 'boolean', default: true })
  isActive?: boolean;
}
