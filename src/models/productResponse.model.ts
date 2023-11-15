import { Product } from "./product.model"

export class ProductResponse {
    products: Product[] = [];
    limit: number = 5;
    skip: number = 0;
    total: number = 0;
}