export {};
const mongoose = require('mongoose');

const QuerySchema = mongoose.Schema({
    query: String,
    queryKey: String,
    userID: Number,
    date: String
});

export const Query = mongoose.model('queries', QuerySchema);