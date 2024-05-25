// models/DNSRecord.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DNSRecordSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'PTR', 'SOA', 'SRV', 'TXT', 'DNSSEC']
  },
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  ttl: {
    type: Number,
    default: 3600
  },
  priority: {
    type: Number,
    default: null 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

DNSRecordSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const DNSRecord = mongoose.model('DNSRecord', DNSRecordSchema);

module.exports = DNSRecord;
