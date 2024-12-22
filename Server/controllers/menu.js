import { Menu, SubMenu } from '../models/menu.js'
// Tạo mới một Menu
export const createMenu = async (req, res) => {
    try {
        const { name, subMenus } = req.body;

        // Tạo mới Menu
        const menu = new Menu({ name });
        await menu.save();

        // Tạo mới các SubMenu và liên kết với Menu
        if (subMenus && subMenus.length > 0) {
            const createdSubMenus = await SubMenu.insertMany(
                subMenus.map(subMenu => ({ ...subMenu, menu: menu._id }))
            );

            // Cập nhật danh sách SubMenu trong Menu
            menu.subMenus = createdSubMenus.map(subMenu => subMenu._id);
            await menu.save();
        }

        res.status(201).json({
            message: 'Tạo Menu thành công!',
            menu,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Lấy danh sách Menu
export const getMenus = async (req, res) => {
    try {
        const menus = await Menu.find().populate('subMenus'); // Populate để lấy chi tiết SubMenu
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy Menu theo ID
export const getMenuById = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id).populate('subMenus');
        if (!menu) {
            return res.status(404).json({ message: 'Menu không tồn tại' });
        }
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cập nhật thông tin Menu
export const updateMenu = async (req, res) => {
    try {
        const { name, subMenus } = req.body;

        // Cập nhật thông tin Menu
        const menu = await Menu.findById(req.params.id);
        if (!menu) {
            return res.status(404).json({ message: 'Menu không tồn tại' });
        }
        menu.name = name;

        // Xóa các SubMenu cũ
        await SubMenu.deleteMany({ menu: menu._id });

        // Tạo mới SubMenu và cập nhật vào Menu
        if (subMenus && subMenus.length > 0) {
            const createdSubMenus = await SubMenu.insertMany(
                subMenus.map(subMenu => ({ ...subMenu, menu: menu._id }))
            );
            menu.subMenus = createdSubMenus.map(subMenu => subMenu._id);
        }

        await menu.save();

        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Xóa Menu
export const deleteMenu = async (req, res) => {
    try {
        const menu = await Menu.findByIdAndDelete(req.params.id);
        if (!menu) {
            return res.status(404).json({ message: 'Menu không tồn tại' });
        }

        // Xóa tất cả SubMenu liên quan đến Menu
        await SubMenu.deleteMany({ menu: menu._id });

        res.status(200).json({ message: 'Menu đã được xóa thành công' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const findMenuBySubMenuId = async (req, res) => {
    try {
        const subMenuId = req.params.id;

        // Tìm SubMenu và populate trường `menu`
        const subMenu = await SubMenu.findById(subMenuId).populate('menu').exec();

        if (!subMenu || !subMenu.menu) {
            return res.status(404).json({ message: 'Menu or SubMenu not found' });
        }

        res.json(subMenu.menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

