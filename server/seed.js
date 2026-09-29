import connectDB from './db/connection.js';
import Business from './models/Business.js';
import User from './models/Users.js';
import Product from './models/Product.js';
import Category from './models/Category.js';
import Supplier from './models/Suppliers.js';
import ItemTransaction from './models/ItemTransaction.js';
import Order from './models/Order.js';

const seed = async () => {
    try {
        await connectDB();

        // Clean database
        console.log("Cleaning database...");
        await Business.deleteMany({});
        await User.deleteMany({});
        await Product.deleteMany({});
        await Category.deleteMany({});
        await Supplier.deleteMany({});
        await ItemTransaction.deleteMany({});
        await Order.deleteMany({});

        // 1. Create Tech Corp Business
        console.log("Creating Tech Corp...");
        const techCorp = await Business.create({
            name: "Tech Corp",
            email: "info@techcorp.com",
            slug: "techcorp"
        });

        // 2. Create Fashion Hub Business
        console.log("Creating Fashion Hub...");
        const fashionHub = await Business.create({
            name: "Fashion Hub",
            email: "info@fashionhub.com",
            slug: "fashionhub"
        });

        // Global Superadmin (site owner)
        const ownerSuperadmin = new User({
            name: "Owner Superadmin",
            email: "owner@storemate.com",
            password: "ownersuperadmin",
            address: "Owner HQ",
            role: "superadmin"
        });
        await ownerSuperadmin.save();

        // 3. Create Users for Tech Corp
        console.log("Creating Tech Corp Users...");
        const techAdmin = new User({
            name: "Tech Admin",
            email: "admin@techcorp.com",
            password: "admintech",
            address: "Tech Corp HQ",
            role: "admin",
            businessId: techCorp._id
        });
        await techAdmin.save();

        const techStaff = new User({
            name: "Tech Staff",
            email: "staff@techcorp.com",
            password: "stafftech",
            address: "Tech Corp Store",
            role: "staff",
            businessId: techCorp._id
        });
        await techStaff.save();

        // 4. Create Users for Fashion Hub
        console.log("Creating Fashion Hub Users...");
        const fashionAdmin = new User({
            name: "Fashion Admin",
            email: "admin@fashionhub.com",
            password: "adminfashion",
            address: "Fashion Hub HQ",
            role: "admin",
            businessId: fashionHub._id
        });
        await fashionAdmin.save();

        const fashionStaff = new User({
            name: "Fashion Staff",
            email: "staff@fashionhub.com",
            password: "stafffashion",
            address: "Fashion Hub Store",
            role: "staff",
            businessId: fashionHub._id
        });
        await fashionStaff.save();

        // 5. Create some Categories for Tech Corp
        console.log("Creating Tech Corp Categories...");
        const techCategory = await Category.create({
            name: "Electronics",
            businessId: techCorp._id
        });

        // 6. Create some Categories for Fashion Hub
        console.log("Creating Fashion Hub Categories...");
        const fashionCategory = await Category.create({
            name: "Apparel",
            businessId: fashionHub._id
        });

        // 7. Create some Suppliers for Tech Corp
        console.log("Creating Tech Corp Suppliers...");
        const techSupplier = await Supplier.create({
            name: "Apex Electronics",
            email: "apex@techcorp.com",
            number: "01711223344",
            address: "Dhaka, Bangladesh",
            businessId: techCorp._id
        });

        // 8. Create some Suppliers for Fashion Hub
        console.log("Creating Fashion Hub Suppliers...");
        const fashionSupplier = await Supplier.create({
            name: "Zara Fabrics",
            email: "zara@fashionhub.com",
            number: "01811223344",
            address: "Chittagong, Bangladesh",
            businessId: fashionHub._id
        });

        // 9. Create Products for Tech Corp
        console.log("Creating Tech Corp Products...");
        await Product.create({
            name: "Smart Watch",
            category: "Electronics",
            price: 5000,
            stock: 50,
            serialNo: "SW100",
            supplier: "Apex Electronics",
            businessId: techCorp._id
        });

        // 10. Create Products for Fashion Hub
        console.log("Creating Fashion Hub Products...");
        await Product.create({
            name: "Denim Jacket",
            category: "Apparel",
            price: 3500,
            stock: 30,
            serialNo: "DJ200",
            supplier: "Zara Fabrics",
            businessId: fashionHub._id
        });

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error.message);
    } finally {
        process.exit(0);
    }
};

seed();