import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { In, Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async find(property: string, propertyName: 'id' | 'name', from?: 'create') {
    const category = await this.categoryRepo.findOneBy({
      [propertyName]: property,
    });
    if (from) {
      return category;
    }
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async findAll(categories?: string[], propertyName?: 'id' | 'name') {
    let categoriesArr: Category[] = [];
    if (categories) {
      for (const category of categories) {
        const cat = await this.find(category, propertyName);
        categoriesArr.push(cat);
      }
      return categoriesArr;
    }
    return this.categoryRepo.find();
  }

  async create(createCatgoryDto: CreateCategoryDto) {
    const catgory = await this.find(createCatgoryDto.name, 'name', 'create');
    if (catgory) {
      throw new BadRequestException('Category already existent');
    }
    const createdCatgory = this.categoryRepo.create(createCatgoryDto);
    return this.categoryRepo.save(createdCatgory);
  }
  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.find(id, 'id');
    Object.assign(category, updateCategoryDto);
    return this.categoryRepo.save(category);
  }

  async delete(id: string) {
    const category = await this.find(id, 'id');
    return this.categoryRepo.remove(category);
  }
}
