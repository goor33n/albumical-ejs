// music에 대한 CRUD를 구현하는 기능
import { Request, Response } from 'express';
import Comment from "../../model/comment";
import Album from "../../model/album";

// 목록조회
// http://localhost:3000/music?limit=3 (GET)
// - 성공: limit 수만큼 music 객체를 담은 배열을 리턴(200: OK)
// - 실패: limit가 숫자가 아닌 경우 (400: Bad Request)
const list = async (req: Request, res: Response) => {
  const id = req.params.id;
  // console.log(id)
  try {
    const albumResult = await Album.findById(id);
    const commentResult = await Comment.find({ albumId: id }).sort({ _id: -1 })
    console.log(albumResult, commentResult)
    res.status(200).render("album/comment", { albumResult, commentResult });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "목록조회 시 오류가 발생했습니다." });
  }
}

// 상세조회
// http://localhost:3000/music/:id
// - 성공: id에 해당하는 music 객체 리턴 (200: OK)
// - 실패: 해당하는 id가 없는 경우 (404: Not Found)
const detail = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await Comment.findById(id);
    if (!result) {
      return res.status(404).json({ message: "해당하는 데이터가 없습니다." });
    }

    res.status(200).render("album/detail", { result });  // result: { singer: xx, title: xx }

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "상세조회 시 오류가 발생했습니다." });
  }
}

// 등록
// http://localhost:3000/music (POST, form data)
// - 성공: 입력받은 데이터로 music 객체를 만들어 배열에 추가 (201: Created)
// - 실패: title, singer 값 누락시 (400: Bad Request)
const create = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id)
  // console.log(req.file!.filename, req.body)
  const { commentTxt } = req.body;
  if (!commentTxt) {
    return res.status(400).send("필수 입력값이 누락되었습니다.");
  }

  try {
    const comment = new Comment({ albumId: id, commentTxt });
    const result = await comment.save();
    list(req, res)
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "등록 시 오류가 발생했습니다." });
  }
}

// 삭제
// http://localhost:3000/music/1
// - 성공: id에 해당하는 music 객체를 찾아서 배열에서 삭제 후 배열을 리턴 (200: OK)
// - 실패: 없는 id일 경우 (404: Not Found)
const remove = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await Comment.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "해당하는 데이터가 없습니다." });
    }
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "삭제 시 오류가 발생했습니다." })
  }
}

export { list, create, remove };
