import { Schema, model } from 'mongoose';

// 인터페이스 생성
interface IComment {
  albumId: string;
  commentTxt: string;
}

// 스키마 생성
const commentSchema = new Schema<IComment>({
  albumId: {
    type: String,
    required: true
  },
  commentTxt: {
    type: String,
    required: true
  }
});

// 모델
// musics라는 컬렉션이 생성
const Comment = model('comment', commentSchema)

export default Comment;