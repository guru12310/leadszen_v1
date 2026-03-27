const router = require('express').Router();
const controller = require('../controllers/client.controller');
const auth = require('../middleware/auth.middleware');

router.get('/me', auth, controller.getMe);
router.put('/update', auth, controller.updateProfile);

module.exports = router;