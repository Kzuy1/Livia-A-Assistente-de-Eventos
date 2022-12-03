const mongoose = require('mongoose');

const allyNames = new mongoose.Schema({
    guildName: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    guildInfo: {
        type: mongoose.SchemaTypes.Array,
        required: true,
    },
})

module.exports = mongoose.model("allyNames", allyNames);