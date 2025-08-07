import bcrypt from 'bcrypt';
import User from './models/User.js';
import connectDB from './db/connection.js';

const register=async () => {
    try {
        await connectDB();
        const hashedPassword = await bcrypt.hash('admin', 10);
        const newUser = new User({
            name: 'Admin',
            email: 'admin@gmail.com',
            password: hashedPassword,
            address: 'admin address',
            role: 'admin',      
        });
        await newUser.save();
        console.log('Admin user created successfully');
    } catch (error) {
        console.log('Error creating admin user:', error.message);
    }
}            

register()