const mongoose = require('mongoose');

const guild = new mongoose.Schema({
    serverID: { type: String, required: true },
    channelID: { type: String, required: true },
    reason: { type: String, required: true },
});

const Guild = module.exports = mongoose.model('guild', guild);