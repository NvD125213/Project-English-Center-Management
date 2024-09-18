import express from 'express'
import { getPost, createPost, updatePost } from '../controllers/post.js'

const router = express.Router();

router.get('/', getPost)

router.post('/create', createPost)

router.get('/update', updatePost)


export default router