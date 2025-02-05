/** @jsxImportSource @emotion/react */
import fs from "fs";
import path from "path";
import { GetServerSideProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import ArticlePage from "@/components/Pages/Articles/ArticlePage";
import { mdxConfig } from "@/components/Pages/Articles/ArticlePage/utils/mdxConfig";

/** 
 * If the URL is /article/sample-article/sub-article
 * `params.slug` will be ["sample-article", "sub-article"]
 */

// Interface for metadata
interface Metadata {
  title: string;
  description: string;
  author: string;
  date: string;
  lastUpdated: string;
}

// Server-side Props Interface
interface Props {
  content: any;
  metadata: Metadata; // Metadata can be null if not found
  slugPath: string[]; // Store the entire slug array for reference
  hasBanner: boolean; // Indicates if a banner image exists
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  // Extract slug path from the URL
  const slugPath = Array.isArray(params?.slug) ? params.slug : [];

  // Build the absolute path in the public/articles directory
  const articlePath = path.join(process.cwd(),  "articles", ...slugPath);

  if (!fs.existsSync(articlePath)) {
    return { notFound: true }; // Return 404 if the folder does not exist
  }

  // File paths for the expected structure
  const metadataPath = path.join(articlePath, "metadata.json");
  const markdownPath = path.join(articlePath, "main.md");

  const bannerImageName = `${slugPath.join("-")}-banner.jpg`;
  const bannerImagePath = path.join(process.cwd(), "public", "images", "articles", bannerImageName);

  // Check if the main.md file exists (mandatory)
  if (!fs.existsSync(markdownPath)) {
    return { notFound: true }; // main.md is required
  }

  const hasBanner = fs.existsSync(bannerImagePath); // Check for the presence of banner.jpg

  // Read and parse metadata.json if it exists
  let metadata: Metadata | null = null;
  if (fs.existsSync(metadataPath)) {
    try {
      metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));
    } catch (error) {
      console.error("Failed to parse metadata.json:", error);
    }
  }

  // Set default metadata values if metadata.json is missing
  if (!metadata) {
    metadata = {
      title: slugPath[slugPath.length - 1]?.replace(/-/g, " ") || "Untitled Article",
      description: "No description provided.",
      author: "Unknown Author",
      date: new Date().toISOString().split("T")[0], // Use today's date
      lastUpdated: new Date().toISOString().split("T")[0],
    };
  }

  // Read the markdown content
  const markdownContent = fs.readFileSync(markdownPath, "utf8");

  // Serialize Markdown content
  const mdxSource = await serialize(markdownContent, {
    mdxOptions: mdxConfig,
  });

  return {
    props: {
      content: mdxSource,
      metadata,
      slugPath,
      hasBanner,
    },
  };
};

export default function Article({ content, metadata, slugPath, hasBanner }: Props) {
  return (
    <ArticlePage
      content={content}
      metadata={metadata}
      slugPath={slugPath} // Pass slugPath for breadcrumbs and other logic
      hasBanner={hasBanner}
    />
  );
}
