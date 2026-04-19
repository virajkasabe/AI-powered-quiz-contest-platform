import mongoose from 'mongoose';
import Intern from './models/intern.js';
import Admin from './models/admin.js';
import 'dotenv/config';

async function getUsers() {
  await mongoose.connect(process.env.MONGO_URL);
  
  const admins = await Admin.find().limit(1);
  const interns = await Intern.find().limit(2);
  
  console.log('--- ADMINS ---');
  admins.forEach(a => console.log(`Email: ${a.email}, Name: ${a.name}, Role: ${a.role}`));
  
  console.log('--- INTERNS ---');
  interns.forEach(i => console.log(`UniqueId: ${i.uniqueId}, Name: ${i.name}, Domain: ${i.domain}, JoinDate: ${i.joiningDate.toISOString().split('T')[0]}`));
  
  await mongoose.disconnect();
}

getUsers();
