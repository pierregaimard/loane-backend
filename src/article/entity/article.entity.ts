import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleCategory } from '../category/entity/article.category.entity';
import {
  IsDecimal,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from 'class-validator';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  @IsNotEmpty()
  @Length(2, 20)
  @Matches(/^[a-zA-Z0-9]+([-_]?[a-zA-Z0-9])*$/, {
    message: '$property can only contain letters, numbers and dashes',
  })
  code?: string;

  @Column({ type: 'varchar', length: 60, nullable: false, unique: true })
  @IsNotEmpty()
  @Length(3, 60)
  @IsString()
  name?: string;

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: false })
  @IsNotEmpty()
  @IsDecimal({ force_decimal: true, decimal_digits: 2 })
  price?: number;

  @ManyToOne(() => ArticleCategory, { nullable: false })
  @ValidateNested()
  @IsNotEmpty()
  category?: ArticleCategory;
}
