const mongoose = require('mongoose');

const { Schema } = mongoose;

const roomSchema = new Schema({
  // 방 제목
  title: {
    type: String,
    required: true
  },
  // 최대 수용 인원
  max: {
    type: Number,
    required: true,
    defaultValue: 10,
    min: 2 // 최소 수용 인원
  },
  // 방장
  owner: {
    type: String,
    required: true
  },
  // 방 비밀번호
  password: String,
  // 생성 시각
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Room', roomSchema);
