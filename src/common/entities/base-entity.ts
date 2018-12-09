export class BaseEntity<T> {
  createdAt: Date;
  updatedAt: Date;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
