export interface IEntity<T> {
  findAll(): T[];

  findOne(id: number): T;

  remove(id: number): T;
}
