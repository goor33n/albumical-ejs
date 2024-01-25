import { Schema, model } from 'mongoose';

// 인터페이스 생성
interface IAlbum {
  title: string;
  artist: string;
  released: string;
  description: string;
  imgPath: string;
}

// 스키마 생성
const albumSchema = new Schema<IAlbum>({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  released: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
  },
  imgPath: {
    type: String,
    required: true
  }
});

// 모델
// musics라는 컬렉션이 생성
const Album = model('album', albumSchema)

export default Album;