import { Router } from 'express';
import { Request, Response } from 'express';
import { list, create, remove } from './comment.ctrl';

const router = Router();

// http://localhost:3000/
router.get('/:id', list);
router.post('/:id', create);

router.delete('/:alId/:id', remove);

export default router;