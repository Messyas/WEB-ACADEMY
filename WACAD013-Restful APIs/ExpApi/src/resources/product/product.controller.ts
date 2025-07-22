import { Request, Response } from "express";
import {
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} from "./product.service";
import { getAllProducts } from "./product.service";
import { CreateProductDto } from "./product.types";

const index = async (req: Request, res: Response) => {
  /*
  #swagger.summary = 'Recupera dados de todos os produtos da base.'
  #swagger.responses[200] = {
   schema: { $ref: '#/definitions/Produtos' }
  }
 */
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json(e);
  }
};

const create = async (req: Request, res: Response) => {
  /*
 #swagger.summary = 'Adiciona um novo produto na base.'
 #swagger.parameters['body'] = {
 in: 'body',
 schema: { $ref: '#/definitions/CreateProdutoDto' }
 }
 #swagger.responses[200] = {
 schema: { $ref: '#/definitions/Produto' }
 }
 */
  const product = req.body as CreateProductDto;
  try {
    //add valid
    const newProduct = await createProduct(product);
    res.status(201).json(newProduct);
  } catch (e) {
    res.status(500).json(e);
  }
};

const read = async (req: Request, res: Response) => {
  /*
 #swagger.summary = 'Recupera dados de um produto específico.'
 #swagger.parameters['id'] = { description: "ID do produto" }
 #swagger.responses[200] = {
   schema: { $ref: '#/definitions/Produto' }
 }
 */

  const { id } = req.params;
  try {
    const prod = await getProduct(id);
    if (!prod) {
      res.status(400).json({ message: "produto não existe" });
      return;
    }
    res.status(200).json(prod);
  } catch (e) {
    res.status(500).json(e);
  }
};

const update = async (req: Request, res: Response) => {
  /*
 #swagger.summary = 'Atualiza informações de um produto específico.'
  #swagger.parameters['id'] = { description: "ID do produto" }
 #swagger.parameters['body'] = {
 in: 'body',
 schema: { $ref: '#/definitions/CreateProdutoDto' }
 }
 #swagger.responses[200] = {
 schema: { $ref: '#/definitions/Produto' }
 }
 */
  const { id } = req.params;
  const product = req.body;
  try {
    const prod = await getProduct(id);
    if (!prod) {
      res.status(400).json({ message: "produto não existe" });
      return;
    }

    await updateProduct(id, product);
    res.status(200).json({ message: "produto atualizado" });
  } catch (e) {
    res.status(500).json(e);
  }
};

const remove = async (req: Request, res: Response) => {
  /*
 #swagger.summary = 'Deleta um produto específico.'
 #swagger.parameters['id'] = { description: "ID do produto" }
 #swagger.responses[200] = {}
 */
  const { id } = req.params;
  try {
    const prod = await getProduct(id);
    console.log(prod);

    if (!prod) {
      res.status(400).json({ message: "produto não existe" });
      return;
    }
    await deleteProduct(id);
    res.status(200).json({ message: "produto apagado" });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

export default { index, create, read, update, remove };
