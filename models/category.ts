class Category {
  constructor(public id: string, public title: string, public color: string) {
    this.id = id;
    this.title = title;
    this.color = color;
  }
}

export default Category;

export type CategoryItemT = {
  id: string;
  title: string;
  color: string;
};
