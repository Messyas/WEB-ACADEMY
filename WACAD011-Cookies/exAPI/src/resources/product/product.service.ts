import { Product } from './product.types';

let products: Product[] = [
  {
    id: 1,
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
  },
  { id: 2, name: 'Mouse', 
    description: 'Wireless mouse', 
    price: 25 },
];

let lastId = 2;

export const productService = {
  findAll: (): Product[] => {
    return products;
  },

  findOne: (id: number): Product | undefined => {
    return products.find((p) => p.id === id);
  },

  create: (data: Omit<Product, 'id'>): Product => {
    lastId++;
    const newProduct: Product = {
      id: lastId,
      ...data,
    };
    products.push(newProduct);
    return newProduct;
  },

  update: (
    id: number,
    data: Partial<Omit<Product, 'id'>>,): Product | undefined => {
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      return undefined;
    }

    const updatedProduct = { ...products[productIndex], ...data };
    products[productIndex] = updatedProduct;
    return updatedProduct;
  },

  remove: (id: number): boolean => {
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      return false;
    }

    products.splice(productIndex, 1);
    return true;
  },
};
