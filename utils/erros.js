const ValidationErrorCode = 400;
const castErrorCode = 400;
const serverErrorCode = 500;

const checkError = (err, res) => {
  if (err.name === 'ValidationError') {
    res
      .status(ValidationErrorCode)
      .send({ message: 'Отправленные данные неверны' });
  } else if (err.name === 'CastError') {
    res
      .status(castErrorCode)
      .send({ message: 'Запрашиваемый ресурс не существует' });
  } else {
    res.status(serverErrorCode).send({ message: 'Ошибка сервера' });
  }
};

module.exports = checkError;
