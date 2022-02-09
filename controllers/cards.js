const Card = require('../models/card');
const checkError = require('../utils/erros');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => checkError(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ messgae: 'Нет данных по переданному id' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => checkError(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => checkError(err, res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ messgae: 'Нет данных по переданному id' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => checkError(err, res));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ messgae: 'Нет данных по переданному id' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => checkError(err, res));
};
