import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import uploadFile from './services/storage.service.js';
import postModel from './models/post.model.js';
import cors from 'cors';

const app = express();

app.use(cors()); // Allows your frontend to talk to this backend
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// 1. GET Root: For checking if the server is live in the browser
app.get('/', (req, res) => {
  res.json({ message: "PicDrop API is active!" });
});

// 2. POST Root: For uploading (Used by your frontend CreatePost)
app.post('/', upload.single("image"), async (req, res) => {
    try {
        const result = await uploadFile(req.file.buffer);

        const post = await postModel.create({
            image: result.url,
            caption: req.body.caption
        });

        return res.status(200).json({
            message: "Post uploaded successfully",
            data: post
        });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: "Upload failed", error: error.message });
    }
});

// 3. GET Posts: For fetching the feed
app.get('/posts', async (req, res) => {
    try {
        const posts = await postModel.find();
        return res.status(200).json({
            message: "Posts fetched successfully",
            data: posts
        });
    } catch (error) {
        res.status(500).json({ message: "Fetch failed", error: error.message });
    }
});

export default app;