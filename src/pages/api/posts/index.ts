import { dbConnect } from "@/lib/db";
import Post from "@/models/Post";
import slugify from "slugify";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    const posts = await Post.find({});
    return res.status(200).json(posts);
  }

  if (req.method === "POST") {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required." });
    }
    const slug = slugify(title, { lower: true, strict: true });
    const post = await Post.create({ title, content, slug });
    return res.status(201).json(post);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
