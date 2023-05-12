import { Gender } from "src/app/shared/model/enums/gender";
import { Size } from "src/app/products/model/enums/size";
import { Category } from "src/app/products/model/enums/category";

export interface Product {
    id?: string;
    availableSizes: Size[],
    gender: Gender,
    name: string,
    category: Category,
    photoUrl: string;
    price: number;
}
