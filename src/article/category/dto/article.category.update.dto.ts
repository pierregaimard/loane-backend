import { PartialType } from '@nestjs/mapped-types';
import { ArticleCategory } from '../entity/article.category.entity';

export class ArticleCategoryUpdateDto extends PartialType<ArticleCategory>(
  ArticleCategory,
) {}
