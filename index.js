import express from 'express';
import connectDatabase from './src/database/db.js';
import router from './src/routes/user.route.js';

const port = 3000;
const app = express()

connectDatabase();
app.use(express.json());
app.use('/user.js', router);

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
