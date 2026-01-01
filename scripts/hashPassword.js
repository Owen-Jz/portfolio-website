/**
 * Utility script to hash admin password
 * Run: node scripts/hashPassword.js
 */

import bcrypt from "bcryptjs";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter password to hash: ", async (password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    console.log("\n✅ Hashed password:");
    console.log(hash);
    console.log("\n📝 Add this to your .env.local file:");
    console.log(`ADMIN_PASSWORD=${hash}\n`);
    rl.close();
  } catch (error) {
    console.error("Error hashing password:", error);
    rl.close();
  }
});

