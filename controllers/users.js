const User = require('../models/user');
const checkError = require('../utils/erros');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => checkError(err, res));
};

module.exports.getSpecificUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ messgae: 'Нет данных по переданному id' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => checkError(err, res));
};
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => checkError(err, res));
};

module.exports.updateUserProfile = (req, res) => {
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
        res.status(404).send({ messgae: 'Нет данных по переданному id' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => checkError(err, res));
};

module.exports.updateUserAvatar = (req, res) => {
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
        res.status(404).send({ messgae: 'Нет данных по переданному id' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => checkError(err, res));
};
