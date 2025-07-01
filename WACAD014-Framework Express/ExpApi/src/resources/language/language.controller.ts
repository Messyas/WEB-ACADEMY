import { Request, Response } from 'express';

const changeLang = (req: Request, res: Response) => {
    const { lang } = req.body;
    res.cookie('lang', lang).json({ msg: "Linguagem alterada."});
};

export default { changeLang };