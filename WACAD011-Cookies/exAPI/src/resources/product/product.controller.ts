import { Request, Response } from 'express';
import { productService } from './product.service';

const index = (req: Request, res: Response) => {
  const products = productService.findAll();
  return res.status(200).json(products);
};

const create = (req: Request, res: Response) => {
  const newProduct = productService.create(req.body);
  return res.status(201).json(newProduct);
};

const read = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const product = productService.findOne(id);
  if (!product) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }
  return res.status(200).json(product);
};

const update = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const updatedProduct = productService.update(id, req.body);
  if (!updatedProduct) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }
  return res.status(200).json(updatedProduct);
};

const remove = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const success = productService.remove(id);
  if (!success) {
    return res.status(404).json({ message: 'Produto não encontrado' });
  }
  return res.status(204).send();
};

export default {
  index,
  create,
  read,
  update,
  remove,
};