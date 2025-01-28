const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Student name is required.'],
            trim: true, // Remove whitespace from both ends
        },
        age: {
            type: Number,
            required: [true, 'Student age is required.'],
            min: [1, 'Age must be at least 1.'],
        },
        class: {
            type: String,
            required: [true, 'Class is required.'],
        },
        section: {
            type: String,
            default: null, // Default value is null if not provided
        },
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

module.exports = mongoose.model('Student', studentSchema);
