import { Router } from 'express';
import productController from '../controllers/product';

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script defer src="/js/script.js"></script>
    <link rel="stylesheet" href="/css/styles.css" />
  </head>
  <body>
    <h1>Web Academy</h1>
  </body>
</html>
`;

const router = Router();

router.get("/", (req, res) => {
    res.send(html);
});

// Controlador Product
router.get('/product', productController.index);
router.all('/product/create', productController.create);
router.all('/product/update/:id', productController.update);
router.get('/product/:id', productController.read);
router.post('/product/remove', productController.remove);

export default router;