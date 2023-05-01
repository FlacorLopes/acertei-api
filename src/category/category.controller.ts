import { CreateCategoryDto } from './dto/create-category.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  async getCategories() {
    await new Promise((resolve) => setTimeout(() => resolve(true), 5000));
    return this.categoryService.getCategories();
  }

  @Post()
  createCategory(@Body() body: CreateCategoryDto) {
    return this.categoryService.createCategory(body);
  }

  @Delete(':id')
  deleteCategory(@Param('id', new ParseUUIDPipe()) id: string) {
    return 'deleting category ' + id;
  }
}
