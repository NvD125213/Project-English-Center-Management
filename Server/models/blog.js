import mongoose, { Schema } from 'mongoose'

const Blog = mongoose.model('Blog',
    new Schema(
        {
            title: { type: String, required: true },
            content: { type: String, required: true },
            images: [String],
            subMenu: { type: Schema.Types.ObjectId, ref: 'SubMenu', required: true },
        },
        {
            timestamps: true
        }
    )
)

export default Blog