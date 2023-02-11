export class CreateMaterialDto {
  name: string;
  description?: string = '';
  tags?: string[] = [];
  img?: string = '';
}
