const DNSRecord = require('../model/DNSrecords.model.js');


exports.createDNSRecord = async (req, res) => {
    try {
        const userId=req.user.id;
        const { type, name, value, ttl, priority } = req.body;
        const newDNSRecord = new DNSRecord({
            type,
            name,
            value,
            ttl,
            priority,
            userId
        });

        await newDNSRecord.save();
        res.status(201).json(newDNSRecord);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.getAllDNSRecords = async (req, res) => {
    try {
        const dnsRecords = await DNSRecord.find();
        res.status(200).json(dnsRecords);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.getDNSRecordById = async (req, res) => {
    try {
        const dnsRecord = await DNSRecord.findById(req.params.id);
        if (!dnsRecord) {
            return res.status(404).json({ message: 'DNS record not found' });
        }
        res.status(200).json(dnsRecord);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.updateDNSRecordById = async (req, res) => {
    try {
        const { type, name, value, ttl, priority } = req.body;
        const updatedDNSRecord = await DNSRecord.findByIdAndUpdate(
            req.params.id,
            { type, name, value, ttl, priority, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedDNSRecord) {
            return res.status(404).json({ message: 'DNS record not found' });
        }

        res.status(200).json(updatedDNSRecord);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.deleteDNSRecordById = async (req, res) => {
    try {
        const deletedDNSRecord = await DNSRecord.findByIdAndDelete(req.params.id);
        if (!deletedDNSRecord) {
            return res.status(404).json({ message: 'DNS record not found' });
        }
        res.status(200).json({ message: 'DNS record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
