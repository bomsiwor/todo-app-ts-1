import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { MongoConnection } from './lib/db';
import { newRouter } from './routes';
import { requestTime } from './middleware';

// Read value from env
// Always put this on the beginning of code
dotenv.config();

// Connect to MongoAtlas
// No need to injext this connection to anywhere
MongoConnection();

// Create new express instance
const app = express();

// Use Middleware and internal Helper
app.use(express.json());
app.use(cookieParser());
app.use(requestTime);

// Define new router
newRouter(app);

// Start listening on port
// Declare port
const port = 8012;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

