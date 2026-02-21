
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import route from './Routes/Routes.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Database connection
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('DB Connected Successfully');
    })
    .catch(err => {
        console.error('DB Connection Error:', err.message);
        process.exit(1);
    });


const uploadDir = path.join(__dirname, 'uploads', 'profilePhotos');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Routes
app.use('/api', route);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
    