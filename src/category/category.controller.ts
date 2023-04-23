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

@Controller('category')
export class CategoryController {
  @Get()
  getAllCategories() {
    return [];
  }

  @Post()
  createCategory(@Body() body: CreateCategoryDto) {
    return body;
  }

  @Delete(':id')
  deleteCategory(@Param('id', new ParseUUIDPipe()) id: string) {
    return 'deleting category ' + id;
  }
}
