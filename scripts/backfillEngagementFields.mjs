import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("No MONGODB_URI");
  process.exit(1);
}

async function main() {
  await mongoose.connect(MONGODB_URI, { family: 4, serverSelectionTimeoutMS: 10000 });
  const db = mongoose.connection.db;
  const collection = db.collection("blogposts");

  // Only set where the field is missing — never overwrite a real count.
  const viewsRes = await collection.updateMany(
    { views: { $exists: false } },
    { $set: { views: 0 } }
  );
  const likesRes = await collection.updateMany(
    { likes: { $exists: false } },
    { $set: { likes: 0 } }
  );

  console.log(`views backfilled on ${viewsRes.modifiedCount} docs`);
  console.log(`likes backfilled on ${likesRes.modifiedCount} docs`);

  const posts = await collection
    .find({}, { projection: { slug: 1, views: 1, likes: 1 } })
    .toArray();
  console.log("\nFinal state:");
  posts.forEach((p) => console.log(`  ${p.slug}: views=${p.views} likes=${p.likes}`));

  await mongoose.disconnect();
}

main().catch((e) => {
  console.error("ERROR:", e.message);
  process.exit(1);
});
