import Post from '../models/post.js';  // Import model 'Post'

const getPost = async (req, res) => {
    try { 

        const posts = await Post.find();
        console.log('Posts: ', posts);
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createPost = async (req, res) => {
    try {
        const newPost = req.body
        const post = new Post(newPost)
        await post.save() 
        res.status(200).json(post);
    }
    catch (err) {
        res.status(500).json({ error: err})
    }

};

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const post = await Post.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err });
    }
 };

// Export các hàm
export {
    getPost, createPost, updatePost
};
