import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '@nx-nestjs-typeorm/interceptors';
import { IClass } from '@nx-nestjs-typeorm/interfaces';

export function Serialize(dto: IClass) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
