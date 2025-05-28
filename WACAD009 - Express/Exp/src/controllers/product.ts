import { Request, Response } from 'express';
import { get, post } from "../utils/dbapi"

const index = async (req: Request, res: Response) => {
    const products = await get("products");
    res.render("products/index", {
        products
    });
};

const create = async (req: Request, res: Response) => {
    if (req.method === "GET") {
        res.render("product/create");
    } else if (req.method === "POST") {
        //const newProduct: Product = req.body <-- passado pro awaid no lugar do segundo parametro
        await post("products", req.body);
        res.redirect("/products");
    }
};
const read = async (req: Request, res: Response) => {
    const id = req.params.id;
    const products = await get (`products/${id}`);
    return products.data;
};

const update = async (req: Request, res: Response) => {
    const id = req.params.id;
    

      
};
const remove = async (req: Request, res: Response) => {

};

export default { index, read, create, update, remove }