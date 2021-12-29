import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

@Entity()
export class ArticleCategory {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 30, unique: true, nullable: false })
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  label?: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  @IsNotEmpty()
  @Matches(/^[a-z]+-(50|[1-9]00)$/)
  @Length(2, 30)
  color?: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  @IsNotEmpty()
  @Matches(/^([A-Z][a-z]+)*Icon$/)
  @Length(6, 30)
  icon?: string;
}
