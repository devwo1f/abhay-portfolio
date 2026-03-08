import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../src/data');
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'notion-images');

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const BLOG_DB_ID = process.env.NOTION_BLOG_DB_ID;
const PROJECT_DB_ID = process.env.NOTION_PROJECT_DB_ID;

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

async function downloadImage(url: string, filename: string): Promise<string> {
    if (!url) return '';

    try {
        // Simple heuristic to get extension
        let ext = url.split(/[#?]/)[0].split('.').pop()?.trim().toLowerCase() || 'jpg';
        if (ext.length > 4 || !['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) {
            ext = 'jpg';
        }
        const finalFilename = `${filename}.${ext}`;
        const outputPath = path.join(IMAGES_DIR, finalFilename);
        const publicPath = `/notion-images/${finalFilename}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(outputPath, buffer);

        return publicPath;
    } catch (error) {
        console.error(`❌ Failed to download image ${filename}:`, error);
        return url; // Fallback to original URL if download fails
    }
}

// Initialize Notion client and Markdown converter
const notion = new Client({ auth: NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });

// Helper to reliably parse Notion property values
function getPropertyValue(property: any): any {
    if (!property) return null;
    switch (property.type) {
        case 'title':
            return property.title.map((t: any) => t.plain_text).join('');
        case 'rich_text':
            return property.rich_text.map((t: any) => t.plain_text).join('');
        case 'date':
            return property.date ? property.date.start : null;
        case 'select':
            return property.select ? property.select.name : null;
        case 'multi_select':
            return property.multi_select.map((s: any) => s.name);
        case 'url':
            return property.url;
        case 'checkbox':
            return property.checkbox;
        case 'number':
            return property.number;
        default:
            return null;
    }
}

async function fetchBlogs() {
    if (!BLOG_DB_ID) {
        console.warn('⚠️ NOTION_BLOG_DB_ID is not set in .env. Skipping blogs fetch.');
        return;
    }

    console.log('Fetching Blog Posts from Notion...');
    try {
        const res = await fetch("https://api.notion.com/v1/databases/" + BLOG_DB_ID + "/query", {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + NOTION_API_KEY,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sorts: [{ property: 'Date', direction: 'descending' }]
            })
        });

        if (!res.ok) {
            throw new Error("Notion API HTTP " + res.status + ": " + (await res.text()));
        }

        const response: any = await res.json();

        const blogs = await Promise.all(
            response.results.map(async (page: any) => {
                const props = page.properties;
                const title = getPropertyValue(props.Name);
                const slug = getPropertyValue(props.Slug);
                const date = getPropertyValue(props.Date);
                const readTime = getPropertyValue(props.ReadTime);
                const category = getPropertyValue(props.Category);
                const excerpt = getPropertyValue(props.Excerpt);
                let cover = page.cover?.external?.url || page.cover?.file?.url || '';

                if (cover) {
                    cover = await downloadImage(cover, `blog-${slug || page.id}`);
                }

                // Map Notion blocks to Markdown string
                const mdblocks = await n2m.pageToMarkdown(page.id);
                const markdown = n2m.toMarkdownString(mdblocks);

                return {
                    id: page.id,
                    title: title || 'Untitled',
                    slug: slug || page.id,
                    date: date || 'Unknown Date',
                    readTime: readTime || '5 min read',
                    category: category || 'General',
                    excerpt: excerpt || '',
                    cover: cover,
                    content: markdown.parent || '',
                };
            })
        );

        const outputPath = path.join(DATA_DIR, 'notion-blogs.json');
        fs.writeFileSync(outputPath, JSON.stringify(blogs, null, 2));
        console.log("✅ Saved " + blogs.length + " blog posts to " + outputPath);
    } catch (error: any) {
        console.error('❌ Error fetching blogs:');
        console.error('Message:', error.message);
        console.error('Code:', error.code);
        console.error('Status:', error.status);
    }
}

async function fetchProjects() {
    if (!PROJECT_DB_ID) {
        console.warn('⚠️ NOTION_PROJECT_DB_ID is not set in .env. Skipping projects fetch.');
        return;
    }

    console.log('Fetching Projects from Notion...');
    try {
        const res = await fetch("https://api.notion.com/v1/databases/" + PROJECT_DB_ID + "/query", {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + NOTION_API_KEY,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) {
            throw new Error("Notion API HTTP " + res.status + ": " + (await res.text()));
        }

        const response: any = await res.json();

        const projects = await Promise.all(
            response.results.map(async (page: any) => {
                const props = page.properties;
                const title = getPropertyValue(props.Name);
                const slug = getPropertyValue(props.Slug);
                const description = getPropertyValue(props.Description);
                const tags = getPropertyValue(props.Tags) || [];
                const link = getPropertyValue(props.Link);
                const github = getPropertyValue(props.Github);
                let cover = page.cover?.external?.url || page.cover?.file?.url || '';

                if (cover) {
                    cover = await downloadImage(cover, `project-${slug || page.id}`);
                }

                const mdblocks = await n2m.pageToMarkdown(page.id);
                const markdown = n2m.toMarkdownString(mdblocks);

                return {
                    id: page.id,
                    title: title || 'Untitled',
                    slug: slug || page.id,
                    description: description || '',
                    tags: tags,
                    link: link || '',
                    github: github || '',
                    cover: cover,
                    content: markdown.parent || '',
                };
            })
        );

        const outputPath = path.join(DATA_DIR, 'notion-projects.json');
        fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
        console.log("✅ Saved " + projects.length + " projects to " + outputPath);
    } catch (error: any) {
        console.error('❌ Error fetching projects:');
        console.error('Message:', error.message);
        console.error('Code:', error.code);
        console.error('Status:', error.status);
    }
}

async function main() {
    if (!NOTION_API_KEY) {
        console.error('❌ FATAL: NOTION_API_KEY is not defined in .env! Cannot fetch data.');
        process.exit(0); // Exit gracefully so dev server doesn't crash completely without keys
    }

    console.log('🚀 Starting Notion Data Fetch...');
    await fetchBlogs();
    await fetchProjects();
    console.log('✨ Notion Data Fetch Complete!');
}

main();
