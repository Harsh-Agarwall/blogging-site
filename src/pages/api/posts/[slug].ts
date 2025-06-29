import { dbConnect } from "@/lib/db";
import Post from "@/models/Post";
import slugify from "slugify";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { slug } = req.query;

  const post = await Post.findOne({ slug });

  if (!post) return res.status(404).json({ error: "Not found" });

  if (req.method === "GET") {
    return res.status(200).json(post);
  }

  if (req.method === "PUT") {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required." });
    }
    const newSlug = slugify(title, { lower: true, strict: true });
    post.title = title;
    post.content = content;
    post.slug = newSlug;
    await post.save();
    return res.status(200).json(post);
  }

  if (req.method === "DELETE") {
    await post.deleteOne();
    return res.status(204).end();
  }

  // Handle unsupported methods
  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
