// utils/mdxConfig.ts
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

export const mdxConfig = {
  remarkPlugins: [
    remarkGfm, // GitHub-flavored Markdown (tables, task lists, etc.)
    remarkHtml, // Convert Markdown to HTML
  ],
  rehypePlugins: [
    rehypeHighlight, // Syntax highlighting for code blocks
    rehypeSlug,      // Generate IDs for headings without wrapping them in links
  ],
};
