import mongoose from 'mongoose';

const connectDatabase = () => {
    console.log('Connecting to database...');

    mongoose.connect(
        'mongodb+srv://gusage:gusage@cluster0.i2hjedu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log('Database connection error:', err));
};

export default connectDatabase;