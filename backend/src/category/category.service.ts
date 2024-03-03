import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }
  find(property: string, properyName: 'id' | 'name') {
    return this.categoryRepo.findOneBy({ [properyName]: property });
  }
  async create(createCatgoryDto: CreateCategoryDto) {
    const catgory = await this.find(createCatgoryDto.name, 'name');
    if (catgory) {
      throw new BadRequestException('Category already existent');
    }
    const createdCatgory = this.categoryRepo.create(createCatgoryDto);
    return this.categoryRepo.save(createdCatgory);
  }
  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.find(id, 'id');
    if (!category) {
      throw new NotFoundError('Catgory not found');
    }
    Object.assign(category, updateCategoryDto);
    return this.categoryRepo.save(category);
  }

  async delete(id: string) {
    const category = await this.find(id, 'id');
    if (!category) {
      throw new NotFoundError('Catgory not found');
    }
    return this.categoryRepo.remove(category);
  }
}
