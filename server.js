import dotenv from 'dotenv';
import dbConnect from './config/dbConnection.js';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5001;

dbConnect().then(() => {
    app.listen(PORT, () => {
        console.log("Server running successfully");
    });
});