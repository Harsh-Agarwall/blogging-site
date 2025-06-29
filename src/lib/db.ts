import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

type CachedMongoose = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

type MongooseGlobal = typeof globalThis & {
  mongoose?: CachedMongoose;
};

const globalWithMongoose = global as MongooseGlobal;

const cached: CachedMongoose = globalWithMongoose.mongoose || { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  globalWithMongoose.mongoose = cached;

  return cached.conn;
}
