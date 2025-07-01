import { Router}  from 'express';
import userController from './user.controller';

const router = Router()

router.get('/', userController.index);
router.post('/', userController.create);
router.get('/:id', userController.read);
router.put('/:id', userController.update);
router.patch('/:id', userController.changePassword);
router.delete('/:id', userController.remove);

export default router;