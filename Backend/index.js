import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true,
};

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://samruddhibajage27:uDvjx6vaowK00u9q@cluster0.b0uquu1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.log('MongoDB connection failed', err));

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' })); // Increase the JSON payload limit
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Increase the URL-encoded payload limit
app.use(cookieParser());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
