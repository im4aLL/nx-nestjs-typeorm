/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';

@Injectable()
export class Todo {
  findAll(): any[] {
    return [];
  }

  findOne(id: number) {
    return id;
  }

  remove(id: number) {
    return id;
  }
}
