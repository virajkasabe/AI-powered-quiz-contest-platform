import mongoose from 'mongoose';
import Admin from './models/admin.js';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

async function createTestAdmin() {
  await mongoose.connect(process.env.MONGO_URL);
  
  const email = 'testadmin@athenura.com';
  const existing = await Admin.findOne({ email });
  
  if (existing) {
    console.log('Test admin already exists.');
  } else {
    const hashedPassword = await bcrypt.hash('password123', 10);
    await Admin.create({
      name: 'Test Admin',
      email,
      password: hashedPassword,
      role: 'admin'
    });
    console.log('Test admin created: testadmin@athenura.com / password123');
  }
  
  await mongoose.disconnect();
}

createTestAdmin();
