const ValidationErrorCode = 404;
const castErrorCode = 400;
const serverErrorCode = 500;

const checkError = (err, res) => {
  if (err.statusCode === 404) {
    res
      .status(ValidationErrorCode)
      .send({ message: 'Нет данных по переданному id' });
  } else if (err.name === 'CastError') {
    res
      .status(castErrorCode)
      .send({ message: 'Запрашиваемый ресурс не существует' });
  } else {
    res.status(serverErrorCode).send({ message: 'Ошибка сервера' });
  }
};

module.exports = checkError;
