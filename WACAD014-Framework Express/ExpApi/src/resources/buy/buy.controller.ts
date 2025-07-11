import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { placeOrder } from "./buy.service";

const addProductToCart = (req: Request, res: Response) => {
  const id = req.params.id;
  const quantity = Number(req.params.quantity);

  if (!req.session.cart) {
    req.session.cart = [];
  }
  req.session.cart.push({ id, quantity });
  res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
};

const checkout = async (req: Request, res: Response) => {
  if (!req.session.cart || req.session.cart.length === 0) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "Carrinho vazio",
    });
    return;
  }

  if (!req.session.uid) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
    return;
  }

  try {
    await placeOrder(req.session.uid, req.session.cart);
    req.session.cart = [];
    res.status(StatusCodes.OK).json({ message: "Pedido OK" });
  } catch (err) {
    console.error("Erro durante a compra:", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

export default { addProductToCart, checkout };
