require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const http = require('http');
const server = http.createServer(app);
const { initSocket } = require('./utils/socket');

// Initialize Socket.io
initSocket(server);

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], credentials: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/departments', require('./routes/departmentRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/activity', require('./routes/activityRoutes'));

// Error Handler
app.use(errorHandler);

const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(async () => {
    console.log('Connected to MongoDB');
    
    // Default User Seed
    try {
        /*
        const adminExists = await User.findOne({ email: 'admin@test.com' });
        if (!adminExists) {
            await User.create({
                name: 'admin',
                dateOfBirth: new Date('1990-01-01'),
                email: 'admin@test.com',
                phoneNumber: '1234567890',
                password: 'admin123',
                role: 'Admin'
            });
            console.log('Default Admin user seeded');
        }
        */
    } catch (err) {
        console.error('Failed to seed admin', err);
    }

    server.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
