import { Material } from '@prisma/client';
export class MaterialEntity implements Material {
  id: string;
  name: string;
  description: string;
  tags: string[];
  img: string;
}
