import { PartialType } from '@nestjs/mapped-types';
import { Article } from '../entity/article.entity';

export class ArticleUpdateDto extends PartialType<Article>(Article) {}
