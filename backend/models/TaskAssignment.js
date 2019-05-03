const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskAssignmentSchema = new Schema({
    task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    person: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
    done: { type: Boolean, default: false },
    deadline: Date,
}, { timestamps: true });

module.exports = mongoose.model("TaskAssignment", TaskAssignmentSchema);
