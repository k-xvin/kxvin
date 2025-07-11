import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import slugify from '@sindresorhus/slugify';

const INPUT_DIR = "src/content/"

/**
 * Begin the preprocessing of Markdown files.
 * main() is called at the bottom of the file.
 */
function main() {
    let filenameToSlug = new Map();
    // Go through all Markdown files and add necessary frontmatter for Eleventy
    ModifyMarkdownFiles(INPUT_DIR, AddExtraFrontmatter, filenameToSlug);
    // Go through all Markdown files and update wikilinks with standard Markdown links
    ModifyMarkdownFiles(INPUT_DIR, ReplaceWikilinks, filenameToSlug);
    // Go through all Markdown files and pull the link of the first image into the frontmatter
    ModifyMarkdownFiles(INPUT_DIR, AddThumbnailImage, filenameToSlug);
}

/**
 * Add "title", "description", and "permalink" to the YAML frontmatter of a string
 * @param {string} filePath path to a file
 * @param {string} fileContent contents of the file
 * @param {map} filenameToSlugMapToFill map object to store filename to slug mapping
 * @returns {string} String with additional YAML frontmatter added
 */
function AddExtraFrontmatter(filePath, fileContent, filenameToSlugMapToFill) {
    const { data, content } = matter(fileContent);

    // Title: First H1 (first line that starts with #)
    const titleMatch = content.match(/^# (.+)/m);
    data.title = titleMatch ? titleMatch[1] : "ERROR NO TITLE";

    // Description: First non-blank line
    const descMatch = content.match(/^(.+?)$/m);
    data.description = descMatch ? descMatch[1] : "ERROR NO DESCRIPTION";

    // Add date field. Eleventy relies on the "date" field to sort
    data.date = data.created;

    // Generate slug
    let fileParsed = path.parse(path.relative(INPUT_DIR, filePath));
    let filename = fileParsed.name;
    let slug = slugify(data.title);
    filenameToSlugMapToFill.set(filename, "/" + slug);

    // Set permalink and layout
    data.permalink = slug + "/";
    data.layout = "post.njk";

    // Add "Projects" or "Notes" to the existing tags
    data.tags.unshift(fileParsed.dir);

    return matter.stringify(content, data);
}

/**
 * Replace all wikilink-style links with standard Markdown links.
 * Converts image wikilinks to Markdown image links with absolute paths from "/attachments".
 * Converts non-attachment wikilinks to standard Markdown links with absolute paths from filenameToSlugMap.
 * @param {string} filePath path to a file
 * @param {string} fileContent contents of the file
 * @param {map} filenameToSlugMap map object to read filename to slug mapping
 * @returns 
 */
function ReplaceWikilinks(filePath, content, filenameToSlugMap) {

    // TODO: Does the below even work? I think there's some edge cases with inline code blocks this hasn't accounted for...

    // Step 1: Escape links inside code blocks and inline code
    const escapedCodeBlocks = content
        .replace(/```([\s\S]*?)```/g, (match, code) =>
            `\`\`\`${code.replace(/!\[\[(.*?\.(?:jpg|svg|jpeg|png|gif|webp|bmp|tiff))\]\]/gi, '[BLOCK IMAGE $1]')
                .replace(/\[\[(.*?)(?:\|(.*?))?\]\]/g, '[BLOCK LINK $1|$2]')}\`\`\``)
        .replace(/`([^`]+)`/g, (match, code) =>
            `\`${code.replace(/!\[\[(.*?\.(?:jpg|svg|jpeg|png|gif|webp|bmp|tiff))\]\]/gi, '[INLINE IMAGE $1]')
                .replace(/\[\[(.*?)(?:\|(.*?))?\]\]/g, '[INLINE LINK $1|$2]')}\``);

    // Step 2: Replace image links outside of code blocks
    const replacedImages = escapedCodeBlocks.replace(/!\[\[(.*?\.(?:jpg|svg|jpeg|png|gif|webp|bmp|tiff))\]\]/gi, (match, filename) => {
        const noBaseDirPath = INPUT_DIR.replace(/^\/?[^\/]+/, '');
        return `![${filename}](${noBaseDirPath}attachments/${filename})`; // Replace with Markdown image syntax
    });

    // Step 3: Replace non-image wikilinks outside of code blocks
    const replacedLinks = replacedImages.replace(/\[\[(.*?)(?:\|(.*?))?\]\]/g, (match, filename, alias) => {
        const text = alias || filename; // Use alias if available; otherwise, use the filename
        const path = filenameToSlugMap.get(filename);
        return `[${text}](${path})`; // Replace with Markdown link syntax
    });

    // Step 4: Restore placeholders in code blocks and inline code
    return replacedLinks
        .replace(/\[BLOCK IMAGE (.*?)\]/g, (match, filename) => `![[${filename}]]`)
        .replace(/\[INLINE IMAGE (.*?)\]/g, (match, filename) => `![[${filename}]]`)
        .replace(/\[BLOCK LINK (.*?)\|(.*?)\]/g, (match, filename, alias) => alias ? `[[${filename}|${alias}]]` : `[[${filename}]]`)
        .replace(/\[INLINE LINK (.*?)\|(.*?)\]/g, (match, filename, alias) => alias ? `[[${filename}|${alias}]]` : `[[${filename}]]`);
}

/**
 * Find the first valid image link in a Markdown file and add it to the "thumbnail" key of the frontmatter
 * @param {string} filePath path to a file
 * @param {string} fileContent contents of the file
 * @param {map} filenameToSlugMapToFill map object to store filename to slug mapping
 * @returns {string} String with additional YAML frontmatter added
 */
function AddThumbnailImage(filePath, fileContent, filenameToSlugMapToFill) {
    const { data, content } = matter(fileContent);

    const regex = /(?<!`|```)[^`]*?\!\[.*?\]\((.*?\.(?:jpg|svg|jpeg|png|gif|webp|bmp|tiff))\)/i;
    const match = content.match(regex);
    data.thumbnail = match ? match[1] : "/content/attachments/placeholder.png"

    return matter.stringify(content, data);
}

/**
 * Recursively enumerate through all Markdown files in a given directory and perform an operation
 * @param {string} directoryPath path to the directory containing all Markdown files
 * @param {function} processCallback function to call on each Markdown file. Requires specific function signature.
 * @param {map} filenameToSlugMap map to pass into the processCallback
 */
function ModifyMarkdownFiles(directoryPath, processCallback, filenameToSlugMap) {
    try {
        const files = fs.readdirSync(directoryPath);
        files.forEach(file => {
            const filePath = path.join(directoryPath, file);
            if (fs.statSync(filePath).isDirectory()) {
                // Subdirectory found, go in
                ModifyMarkdownFiles(filePath, processCallback, filenameToSlugMap);
            } else if (file.endsWith('.md')) {

                // Read file, transform content, then write file
                const content = fs.readFileSync(filePath, 'utf8');
                const updatedContent = processCallback(filePath, content, filenameToSlugMap);
                fs.writeFileSync(filePath, updatedContent, 'utf8');

                console.log(`Processed and saved: ${filePath}`);
            }
        });
    } catch (err) {
        console.error('Error processing file:', err);
    }
}

main();
