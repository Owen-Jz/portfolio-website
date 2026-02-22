/**
 * MongoDB Connection Troubleshooting Script
 * Run this to diagnose MongoDB connection issues
 * 
 * Usage: node scripts/testMongoConnection.js
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

console.log('🔍 MongoDB Connection Diagnostics\n');
console.log('━'.repeat(50));

// Check if URI exists
if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in .env.local');
    process.exit(1);
}

// Mask password for security
const maskedUri = MONGODB_URI.replace(/:([^@]+)@/, ':****@');
console.log('📋 Connection String:', maskedUri);
console.log('━'.repeat(50));

// Connection options
const opts = {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 10000,
    maxPoolSize: 10,
    minPoolSize: 2,
};

console.log('\n⏳ Attempting to connect to MongoDB...\n');

const startTime = Date.now();

mongoose.connect(MONGODB_URI, opts)
    .then(() => {
        const duration = Date.now() - startTime;
        console.log(`✅ Successfully connected to MongoDB in ${duration}ms`);
        console.log('━'.repeat(50));
        console.log('📊 Connection Details:');
        console.log(`   - Database: ${mongoose.connection.db.databaseName}`);
        console.log(`   - Host: ${mongoose.connection.host}`);
        console.log(`   - Port: ${mongoose.connection.port}`);
        console.log(`   - Ready State: ${mongoose.connection.readyState}`);
        console.log('━'.repeat(50));

        // Test a simple query
        console.log('\n🔍 Testing database query...');
        return mongoose.connection.db.admin().ping();
    })
    .then(() => {
        console.log('✅ Database ping successful');
        console.log('\n✨ All tests passed! MongoDB connection is working.\n');
        process.exit(0);
    })
    .catch((error) => {
        const duration = Date.now() - startTime;
        console.error(`\n❌ Connection failed after ${duration}ms\n`);
        console.error('━'.repeat(50));
        console.error('Error Details:');
        console.error(`   - Type: ${error.name}`);
        console.error(`   - Code: ${error.code || 'N/A'}`);
        console.error(`   - Message: ${error.message}`);
        console.error('━'.repeat(50));

        console.error('\n🔧 Troubleshooting Steps:\n');

        if (error.code === 'ETIMEOUT' || error.message.includes('timeout')) {
            console.error('1. ⚠️  Check your internet connection');
            console.error('2. ⚠️  Verify MongoDB Atlas IP whitelist includes your IP');
            console.error('   - Go to: https://cloud.mongodb.com/');
            console.error('   - Navigate to: Network Access → IP Access List');
            console.error('   - Add your current IP or use 0.0.0.0/0 for testing');
            console.error('3. ⚠️  Check if your network/firewall blocks MongoDB ports (27017)');
            console.error('4. ⚠️  Try using a VPN or different network');
        } else if (error.message.includes('authentication')) {
            console.error('1. Verify your MongoDB username and password');
            console.error('2. Check if special characters in password are URL-encoded');
            console.error('3. Ensure the database user has proper permissions');
        } else if (error.message.includes('ENOTFOUND')) {
            console.error('1. Check your MongoDB cluster hostname');
            console.error('2. Verify the cluster is running in MongoDB Atlas');
            console.error('3. Check your DNS settings');
        } else {
            console.error('1. Check MongoDB Atlas cluster status');
            console.error('2. Verify connection string format');
            console.error('3. Check MongoDB Atlas logs for issues');
        }

        console.error('\n');
        process.exit(1);
    });
