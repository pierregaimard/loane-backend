import {
  BadRequestException,
  NotFoundException,
  ParseIntPipe,
  Body,
  Controller,
  Param,
  Query,
  Get,
  Post,
  Put,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CategoryService } from './category/category.service';
import { Article } from './entity/article.entity';
import { ArticleUpdateDto } from './dto/article.update.dto';

@Controller('articles')
export class ArticleController {
  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
  ) {}

  @Get()
  async find(@Query('categoryId', ParseIntPipe) categoryId: number) {
    if (categoryId) {
      return await this.articleService.findBy({
        where: { category: { id: categoryId } },
      });
    }

    return await this.articleService.find();
  }

  @Post()
  async save(@Body() article: Article) {
    console.log(article);
    if (!article.category.id) {
      throw new BadRequestException("La catégorie de l'article est manquante");
    }

    const category = await this.categoryService.findOne(article.category.id);

    if (!category) {
      throw new BadRequestException(
        `La categorie d'article ${article.category.id} n'existe pas`,
      );
    }

    article.category = category;

    try {
      return await this.articleService.save(article);
    } catch (err) {
      throw new BadRequestException(err.sqlMessage);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() articleUpdateDto: ArticleUpdateDto,
  ) {
    const article = this.articleService.findOne(id);

    if (!article) {
      throw new BadRequestException(`L'article n° ${id} n'existe pas`);
    }

    articleUpdateDto.id = id;

    try {
      await this.articleService.save(articleUpdateDto);

      return this.articleService.findOne(id);
    } catch (err) {
      throw new BadRequestException(err.sqlMessage);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const article = this.articleService.findOne(id);

    if (!article) {
      throw new NotFoundException();
    }

    return article;
  }
}
