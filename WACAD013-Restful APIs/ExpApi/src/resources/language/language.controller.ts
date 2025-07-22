import { Request, Response } from "express";

const changeLang = (req: Request, res: Response) => {
  /*
   #swagger.summary = 'Altera o cookie language.'
   #swagger.responses[200] = {}
 */
  const { lang } = req.body;
  res.cookie("lang", lang).json({ msg: "Linguagem alterada." });
};

export default { changeLang };
