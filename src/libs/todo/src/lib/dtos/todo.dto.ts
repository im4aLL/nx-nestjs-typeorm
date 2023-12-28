import { Expose, Transform } from 'class-transformer';

export class TodoDto {
  @Expose()
  name: string;

  @Expose()
  isCompleted: boolean;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: string;
}
