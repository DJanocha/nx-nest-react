import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { MaterialsService } from './materials.service';
import { MaterialEntity } from './entities/material.entity';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

const MaterialApiNotFoundResponse = () =>
  ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: `Material not found`,
  });

@Controller('materials')
@ApiTags('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Post()
  @ApiCreatedResponse({ type: MaterialEntity })
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialsService.create(createMaterialDto);
  }

  @Get()
  @ApiOkResponse({ type: MaterialEntity, isArray: true })
  findAll() {
    return this.materialsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: MaterialEntity })
  @MaterialApiNotFoundResponse()
  findOne(@Param('id') id: string) {
    return this.materialsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: MaterialEntity })
  @MaterialApiNotFoundResponse()
  update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto
  ) {
    return this.materialsService.update(id, updateMaterialDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: MaterialEntity })
  @MaterialApiNotFoundResponse()
  remove(@Param('id') id: string) {
    return this.materialsService.remove(id);
  }
}
