require('dotenv').config();

const cors = require('cors')
const express = require('express');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
const followRouter = require('./routes/follow');
const { connectDB } = require('./config/database');

const app = express();
connectDB();

app.use(cors({
    exposedHeaders: 'Authorization'
}));
app.use(express.json());

app.use('/api', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/follow', followRouter);

app.use('*', (req, res) => {
    res
        .status(404)
        .json({
            error: 'Route Not Found'
        });
});

app.listen(4000, () => {
    console.log('Rest API is running on port 4000')
});