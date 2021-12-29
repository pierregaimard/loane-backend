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
    return this.articleRepository.find({ relations: ['ArticleCategory'] });
  }

  findBy(options: object): Promise<Article[]> {
    return this.articleRepository.find({
      relations: ['ArticleCategory'],
      ...options,
    });
  }

  findOne(code: string): Promise<Article> {
    return this.articleRepository.findOne(
      { code: code },
      { relations: ['ArticleCategory'] },
    );
  }

  findOneBy(options: object): Promise<Article> {
    return this.articleRepository.findOne(options, {
      relations: ['ArticleCategory'],
    });
  }

  async save(article: Article): Promise<Article> {
    return await this.articleRepository.save(article);
  }
}
