import {
  BadRequestException,
  NotFoundException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ArticleCategory } from './entity/article.category.entity';
import { ArticleCategoryUpdateDto } from './dto/article.category.update.dto';

@Controller('articles/categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async create(@Body() category: ArticleCategory) {
    try {
      return await this.categoryService.save(category);
    } catch (err) {
      throw new BadRequestException(err.sqlMessage);
    }
  }

  @Get()
  async findAll() {
    return this.categoryService.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const category = await this.categoryService.findOne(id);

    if (!category) {
      throw new NotFoundException();
    }

    return this.categoryService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body()
    categoryUpdateDto: ArticleCategoryUpdateDto,
  ) {
    const category = await this.categoryService.findOne(id);

    if (!category) {
      return new NotFoundException('Category not found');
    }

    categoryUpdateDto.id = category.id;

    try {
      await this.categoryService.save(categoryUpdateDto);

      return await this.categoryService.findOne(id);
    } catch (err) {
      throw new BadRequestException(err.sqlMessage);
    }
  }
}
