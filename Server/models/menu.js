import mongoose, { Schema } from 'mongoose';

const SubMenu = mongoose.model('SubMenu',
    new Schema({
        name: { type: String, required: true },
        link: { type: String },
        menu: { type: Schema.Types.ObjectId, ref: 'Menu' },
    })
);

const Menu = mongoose.model('Menu',
    new Schema(
        {
            name: { type: String, required: true },
            subMenus: [{ type: Schema.Types.ObjectId, ref: 'SubMenu' }], // Tham chiếu đến SubMenu
        },
        { timestamps: true }
    )
);


export { Menu, SubMenu };
