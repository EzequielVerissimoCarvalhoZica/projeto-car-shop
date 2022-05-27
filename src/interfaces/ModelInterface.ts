export interface Model<T> {
  create(obj: T): Promise<T>,
  read(): Promise<T[]>,
  // readOne(id_: string): Promise<T | null>,
  // update(str: string, obj: T): Promise<T | null>,
  // delete(str: string): Promise<T | null>,
}
