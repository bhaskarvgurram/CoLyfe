const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    message: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'Person' },
    people: [{ type: ObjectId, ref: 'Person' }]
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);
