import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Material } from '@prisma/client';

@Injectable()
export class MaterialsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMaterialDto: CreateMaterialDto) {
    return await this.prisma.material.create({
      data: createMaterialDto,
    });
  }

  async findAll(): Promise<Material[]> {
    return await this.prisma.material.findMany();
  }

  async findOne(id: string): Promise<Material> {
    const foundItem = await this.prisma.material.findFirst({ where: { id } });
    if (!foundItem) {
      throw new NotFoundException();
    }
    return foundItem;
  }

  async update(id: string, updateMaterialDto: UpdateMaterialDto) {
    await this.findOne(id);
    return await this.prisma.material.update({
      where: { id },
      data: updateMaterialDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.prisma.material.delete({ where: { id } });
  }
}
