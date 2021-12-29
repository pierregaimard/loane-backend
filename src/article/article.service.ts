import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  find(): Promise<Article[]> {
    return this.articleRepository.find({ relations: ['category'] });
  }

  findBy(options: object): Promise<Article[]> {
    return this.articleRepository.find({
      relations: ['category'],
      ...options,
    });
  }

  findOne(id: number): Promise<Article> {
    return this.articleRepository.findOne(id, { relations: ['category'] });
  }

  findOneBy(options: object): Promise<Article> {
    return this.articleRepository.findOne(options, {
      relations: ['category'],
    });
  }

  async save(article: Article): Promise<Article> {
    return await this.articleRepository.save(article);
  }
}
