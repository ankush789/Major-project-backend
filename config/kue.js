const kue = require('kue');
//Creating Queue
const queue = kue.createQueue();


module.exports = queue;