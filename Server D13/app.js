const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Import the Student schema
const Student = require('./studentSchema');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Successfully connected to MongoDB!');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// API Endpoints

// Add a new student
app.post('/students', async (req, res) => {
    const { name, age, class: className, section } = req.body;

    if (!name || !age || !className) {
        return res.status(400).json({ error: 'Name, age, and class are required fields.' });
    }

    try {
        const newStudent = new Student({
            name,
            age,
            class: className,
            section: section || null, // Default to null if section is not provided
        });

        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add student. Please try again.' });
    }
});

// Fetch all students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch students.' });
    }
});

// Fetch a specific student by ID
app.get('/students/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({ error: 'Student not found.' });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching student details.' });
    }
});

// Update a student by ID
app.put('/students/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, class: className, section } = req.body;

    if (!name || !age || !className) {
        return res.status(400).json({ error: 'Name, age, and class are required fields for updates.' });
    }

    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { name, age, class: className, section },
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found for update.' });
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update student.' });
    }
});

// Delete a student by ID
app.delete('/students/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found for deletion.' });
        }

        res.status(200).json({ message: 'Student successfully deleted.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete student.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
