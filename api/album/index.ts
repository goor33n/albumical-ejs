// CRUD 기능을 라우팅하는 역할
import { Router } from 'express';
import { Request, Response } from 'express';
import { list, detail, create, remove } from './album.ctrl';
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, 'public/image/album')
  },
  filename: function (req: Request, file: any, cb: any) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage });
const router = Router();

// http://localhost:3000/
router.get('/', list);

router.post('/', upload.single('albumCoverImg'), create);
router.delete('/delete/:id', remove);

export default router;