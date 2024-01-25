// music, movie를 분리해주는 라우팅 역할
import { Router } from 'express';
import { Request, Response } from 'express';
import admin_router from './album';
import { list, detail, create, remove } from './album/album.ctrl';
import comment_router from './comment'


const router = Router();

router.get('/', list);
// router.get("/admin", (req, res) => {
//   res.render("admin");  // admin.ejs
// });
router.use('/album/comment', comment_router)
router.get('/album/:id', detail)

// http://localhost:3000/music
// http://localhost:3000/movie
router.use('/admin', admin_router);

export default router;