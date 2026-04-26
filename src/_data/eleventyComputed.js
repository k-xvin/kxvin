import fs from 'fs';
import slugify from '@sindresorhus/slugify';


// Compute additional frontmatter/metadata used in Eleventy but are not present in the rsync'd content
export default {
    // Add tags from existing frontmatter + "projects" or "notes" tag
    tags: (data) => {
        if (!data.page?.filePathStem?.startsWith('/content/')) return;
        const filePath = data.page.filePathStem;
        // Get tags from already-parsed frontmatter (data.tags)
        let allTags = Array.isArray(data.tags) ? [...data.tags] : [];
        // Filter out non-string values
        allTags = allTags.filter(t => typeof t === 'string' && t.trim());
        if (filePath.includes('/projects/')) {
            allTags.splice(0, 0, 'projects');
        } else if (filePath.includes('/notes/')) {
            allTags.splice(0, 0, 'notes');
        }
        return allTags;
    },
    // Parse and add title (first H1)
    title: (data) => {
        if (!data.page?.filePathStem?.startsWith('/content/')) return;
        const content = fs.readFileSync(data.page.inputPath, 'utf8');
        const match = content.match(/^# (.+)/m);
        return match?.[1] || 'ERROR NO TITLE';
    },
    // Parse and add description (first paragraph with content after frontmatter, before first H1)
    description: (data) => {
        if (!data.page?.filePathStem?.startsWith('/content/')) return;
        const content = fs.readFileSync(data.page.inputPath, 'utf8');
        // Strip frontmatter (---...---) before extracting description
        const bodyMatch = content.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/m);
        const body = bodyMatch ? bodyMatch[1] : content;
        const match = body.match(/^(.+?)$/m);
        return match?.[1] || 'ERROR NO DESCRIPTION';
    },
    // Create permalink by slugifying the title. Permalink is computed now in order to properly resolve Obsidian style [[wikilinks]]
    permalink: (data) => {
        if (!data.page?.filePathStem?.startsWith('/content/')) return;
        // Skip if already defined in frontmatter or using pagination
        if (data.permalink !== undefined || data.pagination !== undefined) return;
        const content = fs.readFileSync(data.page.inputPath, 'utf8');
        const match = content.match(/^# (.+)/m);
        const title = match?.[1] || 'untitled';
        return slugify(title) + '/';
    },
    // Parse and add thumbnail (first image if it exists, else use placeholder)
    thumbnail: (data) => {
        if (!data.page?.filePathStem?.startsWith('/content/')) return;
        let content = fs.readFileSync(data.page.inputPath, 'utf8');
        // Strip code blocks (```...```) and inline code (`...`) to avoid matching images inside them
        content = content.replace(/```[\s\S]*?```/g, '').replace(/`[^`]*`/g, '');
        // Match both ![[image.jpg]] wikilink syntax and ![alt](image.jpg) standard markdown
        const wikilinkMatch = content.match(/!\[\[(.+?\.(?:jpg|svg|jpeg|png|gif|webp|bmp|tiff))\]\]/i);
        if (wikilinkMatch) {
            return '/content/attachments/' + wikilinkMatch[1];
        }
        const mdMatch = content.match(/!\[.*?\]\((.*?\.(?:jpg|svg|jpeg|png|gif|webp|bmp|tiff))\)/i);
        return mdMatch?.[1] || '/content/attachments/placeholder.png';
    },
};