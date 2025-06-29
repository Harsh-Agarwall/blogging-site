
# 📝 Markdown Blog App

A full-stack Markdown-powered blog platform built with:

- **Next.js (App Router)**
- **MongoDB (Mongoose)**
- **Tailwind CSS**
- **React Markdown Editor Lite**
- **React Markdown**

Users can create, edit, and display blog posts using clean, GitHub-style Markdown.

---

## 🚀 Features

- ✅ Live Markdown editing with preview
- ✅ Create, edit, and delete blog posts
- ✅ SEO-friendly URLs via slugs
- ✅ Responsive, modern UI with Tailwind
- ✅ Custom Markdown rendering styles
- ✅ MongoDB integration for storage
- ✅ RESTful API for CRUD operations

---

## 🛠 Tech Stack

| Layer     | Technology                     |
|-----------|--------------------------------|
| Frontend  | Next.js 15, React, Tailwind CSS|
| Markdown  | React Markdown Editor Lite     |
| Renderer  | React Markdown + markdown-it   |
| Backend   | Next.js API Routes             |
| Database  | MongoDB + Mongoose             |

---

## 📁 Folder Structure

```bash
src/
├── app/
│   ├── page.tsx              # Dashboard (post list)
│   ├── create/page.tsx       # Create new post
│   ├── edit/[slug]/page.tsx  # Edit existing post
│   └── blog/[slug]/page.tsx  # View post
│
├── components/
│   ├── MarkdownEditor.tsx    # Markdown editor component
│   └── PostForm.tsx          # Reusable post form
│
├── lib/
│   └── db.ts                 # MongoDB connection
│
├── models/
│   └── Post.ts               # Post schema
│
├── pages/api/posts/
│   ├── index.ts              # GET all / POST new
│   └── [slug].ts             # GET / PUT / DELETE by slug
│
├── styles/
│   └── globals.css           # Tailwind + Markdown styles
│
├── tailwind.config.js        # Tailwind config
└── .env.local                # Environment variables
```

---

## 📦 Installation & Setup

### 1. 📥 Clone the Repository

```bash
git clone https://github.com/Harsh-Agarwall/blogging-site.git
cd blogging-site
```

### 2. 📦 Install Dependencies

```bash
npm install
```

---

## 🔐 Add Environment Variables

Create a `.env.local` file in the root with the following:

```env
MONGODB_URI=your_mongodb_connection_string
```

> 💡 You can get this from [MongoDB Atlas](https://cloud.mongodb.com/) or use your local MongoDB instance.

---

## ▶️ Start Development Server

```bash
npm run dev
```

Now go to: [http://localhost:3000](http://localhost:3000)

---

## 🖋 Usage

- `/create` → Create a new blog post  
- `/edit/[slug]` → Edit an existing post  
- `/blog/[slug]` → View a blog post  

All posts are saved in Markdown format and rendered on the frontend with clean formatting using `react-markdown`.

---

## 🎨 Markdown Styling

Blog content is rendered like this:

```tsx
import ReactMarkdown from 'react-markdown';

<ReactMarkdown className="custom-richtext">
  {post.content}
</ReactMarkdown>
```

All styling is handled via the `.custom-richtext` class defined in `globals.css`. It covers:

- Headings
- Paragraphs
- Lists
- Blockquotes
- Code blocks
- Inline code

---

## ✍️ Markdown Example

```markdown
# My Blog Post

Hello, this is a **markdown** post with:

- Lists
- `Inline code`
- ```js
  const greet = () => console.log("Hello");
  ```

> And even blockquotes!
```

---

## 🚀 Deploy on Vercel

1. Push your repo to GitHub  
2. Go to [Vercel](https://vercel.com)  
3. Click "New Project" → Import your GitHub repo  
4. In Vercel dashboard, add environment variable:

```env
MONGODB_URI=your_mongodb_connection_string
```

5. Click **Deploy** ✅

---

## 📄 License

MIT License

---

## 👤 Author

**Harsh Agarwal**  
📧 Contact: [harsh.code0@gmail.com]  


---

> Made with ❤️ using Next.js, Tailwind, and Markdown
