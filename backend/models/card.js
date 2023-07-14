const mongoose = require('mongoose');
const validator = require('validator');

const cardShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле name должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля name - 2'],
    maxlength: [30, 'Максимальная поля name - 30'],
  },
  link: {
    type: String,
    required: [true, 'Поле name должно быть заполнено'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некоректный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Поле name должно быть заполнено'],
    ref: 'user',
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardShema);
