const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const MONGODB_URI = 'mongodb+srv://mufeedshaik16_db_user:agentseva123@agent-seva.tzbr2hv.mongodb.net/agent-seva'

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

async function seed() {
  await mongoose.connect(MONGODB_URI)
  console.log('Connected to MongoDB')

  // Delete existing users
  await User.deleteMany({})

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await User.create({
    name: 'Admin',
    email: 'admin@agentseva.com',
    password: hashedPassword,
    role: 'admin'
  })

  // Create vendor user
  const vendorPassword = await bcrypt.hash('vendor123', 10)
  await User.create({
    name: 'Test Vendor',
    email: 'vendor@agentseva.com',
    password: vendorPassword,
    role: 'vendor'
  })

  console.log('Users created!')
  process.exit(0)
}

seed()