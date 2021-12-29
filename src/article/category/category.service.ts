import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleCategory } from './entity/article.category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(ArticleCategory)
    private articleCategoryRepository: Repository<ArticleCategory>,
  ) {}

  find(): Promise<ArticleCategory[]> {
    return this.articleCategoryRepository.find();
  }

  findBy(options: object): Promise<ArticleCategory[]> {
    return this.articleCategoryRepository.find(options);
  }

  findOne(id: number): Promise<ArticleCategory> {
    return this.articleCategoryRepository.findOne(id);
  }

  findOneBy(options: object): Promise<ArticleCategory> {
    return this.articleCategoryRepository.findOne(options);
  }

  async save(articleCategory: ArticleCategory): Promise<ArticleCategory> {
    return await this.articleCategoryRepository.save(articleCategory);
  }
}
