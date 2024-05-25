const express = require('express');
const router = express.Router();
const dnsController = require('../controller/DNSrecords.controller.js');
const auth = require('../middleware/auth.middleware.js');

router.post('/dnsrecords', auth, dnsController.createDNSRecord);
router.get('/dnsrecords', auth, dnsController.getAllDNSRecords);
router.get('/dnsrecords/:id', auth, dnsController.getDNSRecordById);
router.put('/dnsrecords/:id', auth, dnsController.updateDNSRecordById);
router.delete('/dnsrecords/:id', auth, dnsController.deleteDNSRecordById);

module.exports = router;
