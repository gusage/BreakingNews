import mongoose from 'mongoose';

const connectDatabase = () => {
    console.log('Connecting to database...');

    mongoose.connect(
        process.env.MONGODB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log('Database connection error:', err));
};

export default connectDatabase;