import { Router } from 'express';
import productController from '../controllers/product';
import mainController from '../controllers/main'

const router = Router();

// Main Controller
router.get('/', mainController.index);
//router.get('/lorem', mainController.lorem);
//router.get('/bemvindo/:nome', mainController.bemvindo);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);

// Controller de Product

router.get('/product', productController.index);
router.all('/product/create', productController.create);
router.all('/product/update/:id', productController.update);
router.get('/product/:id', productController.read);
router.post('/product/remove', productController.remove);

export default router;
