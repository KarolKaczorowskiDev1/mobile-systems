import { Category } from 'src/app/products/model/enums/category';
import { Size } from 'src/app/products/model/enums/size';
import { Product } from 'src/app/products/model/product';
import { Gender } from './enums/gender';

export class CartProduct implements Product {
  id?: string;
  price: number;
  photoUrl: string;
  category: Category;
  name: string;
  gender: Gender;
  size: Size;
  amount: number;
  availableSizes: Size[];

  constructor(
    { id, price, photoUrl, category, name, gender, availableSizes }: Product,
    size: Size
  ) {
    this.id = id;
    this.price = price;
    this.photoUrl = photoUrl;
    this.category = category;
    this.name = name;
    this.gender = gender;
    this.size = size;
    this.availableSizes = availableSizes;
    this.amount = 1;
  }
}
