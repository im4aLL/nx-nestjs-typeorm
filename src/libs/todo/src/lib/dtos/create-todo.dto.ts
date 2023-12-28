import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  isCompleted: boolean;
}
