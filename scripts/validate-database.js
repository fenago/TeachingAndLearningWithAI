// Database Validation Script
// Run with: node scripts/validate-database.js

require('dotenv').config({ path: '.env.local' });
const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.DATABASE_NAME || 'your-database-name';

async function validateDatabase() {
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in environment variables');
    process.exit(1);
  }

  console.log('🔍 Connecting to MongoDB...');
  console.log(`📍 URI: ${MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@')}`);

  let client;
  
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    console.log('✅ Successfully connected to MongoDB');
    
    const db = client.db();
    console.log(`📊 Database: ${db.databaseName}`);
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log(`📂 Collections found: ${collections.length}`);
    
    if (collections.length === 0) {
      console.log('⚠️  No collections found. This is normal for a new database.');
      return;
    }
    
    // Check each collection
    for (const collection of collections) {
      const collectionName = collection.name;
      const count = await db.collection(collectionName).countDocuments();
      console.log(`   📋 ${collectionName}: ${count} documents`);
      
      if (collectionName === 'users' && count > 0) {
        console.log('   👥 Sample user documents:');
        const sampleUsers = await db.collection('users').find({}).limit(3).toArray();
        sampleUsers.forEach((user, index) => {
          console.log(`      ${index + 1}. ${user.name || 'No name'} (${user.email || 'No email'})`);
        });
      }
      
      if (collectionName === 'accounts' && count > 0) {
        console.log('   🔗 Authentication providers:');
        const providers = await db.collection('accounts').distinct('provider');
        providers.forEach(provider => {
          console.log(`      📱 ${provider}`);
        });
      }
    }
    
    // Check authentication setup
    console.log('\n🔐 Authentication Analysis:');
    
    const usersCollection = db.collection('users');
    const accountsCollection = db.collection('accounts');
    
    const totalUsers = await usersCollection.countDocuments();
    console.log(`   👤 Total users: ${totalUsers}`);
    
    if (totalUsers > 0) {
      // Check Google OAuth users
      const googleAccounts = await accountsCollection.countDocuments({ provider: 'google' });
      console.log(`   🔵 Google OAuth users: ${googleAccounts}`);
      
      // Check email/magic link users (users without linked accounts)
      const usersWithAccounts = await accountsCollection.distinct('userId');
      const magicLinkUsers = totalUsers - usersWithAccounts.length;
      console.log(`   ✉️  Magic link users: ${magicLinkUsers}`);
      
      // Recent signups (last 7 days)
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const recentUsers = await usersCollection.countDocuments({
        createdAt: { $gte: weekAgo }
      });
      console.log(`   📅 New users (last 7 days): ${recentUsers}`);
      
      // Email verification status
      const verifiedUsers = await usersCollection.countDocuments({
        emailVerified: { $ne: null }
      });
      console.log(`   ✅ Email verified users: ${verifiedUsers}`);
    }
    
    console.log('\n🎯 Validation Complete!');
    
  } catch (error) {
    console.error('❌ Database validation failed:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('💡 Authentication failed. Check your:');
      console.log('   - Username and password in connection string');
      console.log('   - Database user permissions');
      console.log('   - Network access settings (IP whitelist)');
    }
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('💡 DNS resolution failed. Check your:');
      console.log('   - Internet connection');
      console.log('   - MongoDB URI format');
      console.log('   - Cluster hostname');
    }
    
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run validation
validateDatabase().catch(console.error);
