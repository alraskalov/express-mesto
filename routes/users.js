const router = require('express').Router();
const {
  getUsers,
  getSpecificUser,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getSpecificUser);
router.post('/', createUser);
router.patch('/me', updateUserProfile);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
