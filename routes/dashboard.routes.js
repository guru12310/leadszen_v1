const router = require('express').Router();
const controller = require('../controllers/dashboard.controller')
const auth = require('../middleware/auth.middleware');

router.get('/summary',auth,  controller.summary);
router.get('/analytics',auth,  controller.analytics);
router.post('/leadmanual',auth,  controller.addManualLead);

module.exports = router;