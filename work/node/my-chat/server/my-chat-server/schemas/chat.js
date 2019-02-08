const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const chatSchema = new Schema({
  // 채팅방 아이디
  room: {
    type: ObjectId,
    required: true,
    ref: 'Room' // Room 스키마와 연결하여 컬렉션의 ObjectId를 할당한다.
  },
  // 채팅을 한 사람
  user: {
    type: String,
    required: true
  },
  // 채팅 내역
  chat: String,
  // 이미지 주소
  gif: String,
  // 채팅 시각
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Chat', chatSchema);

/**
 * 채팅 내역 또는 이미지 주소 둘 중에 하나만 저장되면 된다.
 */
