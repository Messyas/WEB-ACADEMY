import { Request, Response } from 'express';
import { get, post, put, deleteApi } from '../utils/dbapi';
import { Product } from '../types/products';

const index = async (req: Request, res: Response) => {
  const products = await get('products');
  res.render('products/index', {
    products,
  });
};

const create = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    res.render('products/create');
  } else if (req.method === 'POST') {
    const { nome, preco, stock } = req.body;
    const productToSave: Product = {
      name: nome,
      price: parseFloat(preco),
      stock: parseInt(stock, 10),
    };
    await post('products', productToSave);
    res.redirect('/products');
  }
};

const read = async (req: Request, res: Response) => {
  const id = req.params.id;
  const product = await get(`products/${id}`);
  res.render('products/show', {
    product,
  });
};

const update = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (req.method === 'GET') {
    const product = await get(`products/${id}`);
    res.render('products/edit', {
      product,
    });
  } else if (req.method === 'POST') {
    const { nome, preco, stock } = req.body;
    const productDataToUpdate: Omit<Product, 'id'> = {
      name: nome,
      price: parseFloat(preco),
      stock: parseInt(stock, 10),
    };
    await put(`products/${id}`, productDataToUpdate);
    res.redirect(`/products`);
  }
};

const remove = async (req: Request, res: Response) => {
  const id = req.params.id;
  await deleteApi(`products/${id}`);
  res.redirect('/products');
};

export default { index, read, create, update, remove };
