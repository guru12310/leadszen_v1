const router = require('express').Router();
const controller = require('../controllers/dashboard.controller')
const auth = require('../middleware/auth.middleware');

router.get('/summary',auth,  controller.summary);
router.get('/analytics',auth,  controller.analytics);

module.exports = router;