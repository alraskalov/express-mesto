const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

module.exports.getSpecificUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет данных по переданному id');
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch(next);
};

module.exports.getUserMe = (req, res, next) => {
  User.findById({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет данных по переданному id');
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch(next);
};

module.exports.getSpecificUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет данных по переданному id');
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch(next);
};

module.exports.createUser = async (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  const hash = await bcrypt.hash(password, 10);
  User.create({
    name,
    about,
    avatar,
    email,
    password: hash,
  })
    .then((user) => res.status(200).send({ _id: user.id, email: user.email }))
    .catch((err) => {
      if (err.name === 'MongoError') {
        next(new ConflictError('Пользователь с таким email уже зарегестрирован'));
      }
      next(err);
    });
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ messgae: 'Нет данных по переданному id' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ messgae: 'Нет данных по переданному id' });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', {
        expiresIn: '7d',
      });

      res.status(200).send({ token });
    })
    .catch(next);
};
