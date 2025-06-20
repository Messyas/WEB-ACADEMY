import { Request, Response } from 'express';
import { loremIpsum } from 'lorem-ipsum';

const lorem = (req: Request, res: Response) => {
  const numParagraphsStr = String(req.query.paragraphs);
  const numParagraphs = parseInt(numParagraphsStr, 10);

  if (isNaN(numParagraphs) || numParagraphs <= 0) {
    return res.status(400).render('error', {
      title: 'Erro de Parâmetro',
      errorCode: 400,
      message: 'Erro: Use-> /lorem?paragraphs=3">/lorem?paragraphs=3'
    });
  }

  const loremTextGenerated = loremIpsum({
    count: numParagraphs,
    units: 'paragraphs',
    format: 'html',
  });

  res.render('lorem', {
    title: `${numParagraphs} Paragrafos de Lorem Ipsum`,
    numParagraphs: numParagraphs,
    loremText: loremTextGenerated,
    nextNumParagraphs: numParagraphs + 1
  });
};

export default { lorem };