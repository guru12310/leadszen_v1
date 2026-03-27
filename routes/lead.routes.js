const router = require('express').Router();
const controller = require('../controllers/lead.controller');
const auth = require('../middleware/auth.middleware');

router.post('/:clientId', controller.captureLead);
router.get('/', auth, controller.getLeads);
router.put('/:id/status', auth, controller.updateStatus);
router.post('/manual', auth, controller.addManualLead);

module.exports = router;