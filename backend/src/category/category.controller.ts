import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async getAllCategories() {
    const categories = await this.categoryService.findAll();
    return { categories, message: 'Categories fetched' };
  }

  @Get('id')
  async getCategory(@Param('id') id: string) {
    const category = await this.categoryService.find(id, 'id');
    return {
      category,
      message: 'Category fetched',
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  async addCategory(@Body() createCatgroyDto: CreateCategoryDto) {
    const category = await this.categoryService.create(createCatgroyDto);
    return {
      category,
      message: 'Category added',
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Put('id')
  async editCategory(
    @Param('id') id: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.categoryService.update(id, updateCategoryDto);
    return { category, message: 'Category edited' };
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('id')
  async removeCatgory(@Param('id') id: string) {
    const cateogry = await this.categoryService.delete(id);
    return {
      cateogry,
      message: 'Category deleted',
    };
  }
}
