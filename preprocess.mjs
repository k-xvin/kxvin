import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import slugify from '@sindresorhus/slugify';

const INPUT_DIR = "src2/"

console.log("BEGIN")

// function ModifyFrontMatter(filePath) {
//     const str = fs.readFileSync(filePath, 'utf-8');
//     const { content, data } = matter(str);
//     console.log(data)
//     console.log(content)
// }
// ModifyFrontMatter("src2/projects/Architect.md")

/**
 * Add "title" and "description" to the YAML frontmatter of a string
 * @param {string} inputString 
 * @returns {string} String with additional YAML frontmatter
 */
function AddExtraFrontmatter(filePath, inputString, clientData) {
    const { data, content } = matter(inputString);
    const firstFourLines = content.split('\n').slice(0, 4);
    if (firstFourLines.length == 4) {
        data["title"] = firstFourLines[3].replace('#', '').trim();
        data["description"] = firstFourLines[1];

        let map = clientData;
        let fileParsed = path.parse(filePath);
        let filename = fileParsed.name;
        let noLeadingDirPath = fileParsed.dir.replace(/^\/?[^\/]+/, '');
        let finalPath = noLeadingDirPath + "/" + slugify(data["title"]);
        map.set(filename, finalPath);
        data["permalink"] = finalPath + "/";
    }
    return matter.stringify(content, data);
}

// /**
//  * Replace all wikilink-style image attachment links with standard Markdown attachment links with absolute paths.
//  * @important Assumes the the attachment links all point to files in "/attachments".
//  * @param {string} inputString String to perform the wikilink replacement on
//  * @return {string} Replaced string
//  */
// function ReplaceImageWikilinks(inputString) {
//     // Step 1: Escape images inside code blocks and inline code
//     const escapedCodeBlocks = inputString
//         .replace(/```([\s\S]*?)```/g, (match) => match.replace(/!\[\[(.*?\.(?:jpg|jpeg|png|gif|webp|bmp|tiff))\]\]/gi, '[BLOCK IMAGE $1]'))
//         .replace(/`([^`]+)`/g, (match, code) => `\`${code.replace(/!\[\[(.*?\.(?:jpg|jpeg|png|gif|webp|bmp|tiff))\]\]/gi, '[INLINE IMAGE $1]')}\``)
//         ;

//     // Step 2: Replace image links outside of code blocks
//     const replacedImages = escapedCodeBlocks.replace(/!\[\[(.*?\.(?:jpg|jpeg|png|gif|webp|bmp|tiff))\]\]/gi, (match, filename) => {
//         return `![${filename}](/attachments/${filename})`; // Replace with Markdown image syntax
//     });

//     // Step 3: Restore placeholders in code blocks and inline code
//     return replacedImages
//         .replace(/\[BLOCK IMAGE (.*?)\]/g, (match, filename) => `![[${filename}]]`)
//         .replace(/\[INLINE IMAGE (.*?)\]/g, (match, filename) => `![[${filename}]]`);
// }

/**
 * Replace all wikilink-style links with standard Markdown links.
 * Converts image wikilinks to Markdown image links with absolute paths.
 * Converts non-attachment wikilinks to standard Markdown links.
 * @important Assumes image attachments point to files in "/attachments".
 * @param {string} inputString String to perform the wikilink replacement on
 * @return {string} Replaced string
 */
function ReplaceWikilinks(filePath, inputString, clientData) {
    // Step 1: Escape links inside code blocks and inline code
    const escapedCodeBlocks = inputString
        .replace(/```([\s\S]*?)```/g, (match, code) =>
            `\`\`\`${code.replace(/!\[\[(.*?\.(?:jpg|jpeg|png|gif|webp|bmp|tiff))\]\]/gi, '[BLOCK IMAGE $1]')
                .replace(/\[\[(.*?)(?:\|(.*?))?\]\]/g, '[BLOCK LINK $1|$2]')}\`\`\``)
        .replace(/`([^`]+)`/g, (match, code) =>
            `\`${code.replace(/!\[\[(.*?\.(?:jpg|jpeg|png|gif|webp|bmp|tiff))\]\]/gi, '[INLINE IMAGE $1]')
                .replace(/\[\[(.*?)(?:\|(.*?))?\]\]/g, '[INLINE LINK $1|$2]')}\``);

    // Step 2: Replace image links outside of code blocks
    const replacedImages = escapedCodeBlocks.replace(/!\[\[(.*?\.(?:jpg|jpeg|png|gif|webp|bmp|tiff))\]\]/gi, (match, filename) => {
        return `![${filename}](/attachments/${filename})`; // Replace with Markdown image syntax
    });

    // Step 3: Replace non-image wikilinks outside of code blocks
    const replacedLinks = replacedImages.replace(/\[\[(.*?)(?:\|(.*?))?\]\]/g, (match, filename, alias) => {
        const text = alias || filename; // Use alias if available; otherwise, use the target
        // return `[${text}](/path/to/${target}/)`; // Replace with Markdown link syntax
        // return `[${text}](/path/to/article-hi/)`; // Replace with Markdown link syntax

        let map = clientData;
        let path = map.get(filename);
        return `[${text}](${path})`; // Replace with Markdown link syntax
    });

    // Step 4: Restore placeholders in code blocks and inline code
    return replacedLinks
        .replace(/\[BLOCK IMAGE (.*?)\]/g, (match, filename) => `![[${filename}]]`)
        .replace(/\[INLINE IMAGE (.*?)\]/g, (match, filename) => `![[${filename}]]`)
        .replace(/\[BLOCK LINK (.*?)\|(.*?)\]/g, (match, filename, alias) => alias ? `[[${filename}|${alias}]]` : `[[${filename}]]`)
        .replace(/\[INLINE LINK (.*?)\|(.*?)\]/g, (match, filename, alias) => alias ? `[[${filename}|${alias}]]` : `[[${filename}]]`);
}

// const str = fs.readFileSync("src2/projects/Architect.md", 'utf-8');
// console.log(ReplaceImageWikilinks(str))
// fs.writeFileSync("src2/projects/Architect2.md", ReplaceImageWikilinks(str), 'utf-8');

function ModifyMarkdownFiles(directoryPath, processCallback, clientData) {
    try {
        const files = fs.readdirSync(directoryPath);
        // Process each file or subdirectory
        files.forEach(file => {
            const filePath = path.join(directoryPath, file);

            // Check if it's a directory
            if (fs.statSync(filePath).isDirectory()) {
                // Recursively process the files in the subdirectory
                ModifyMarkdownFiles(filePath, processCallback, clientData);
            } else if (file.endsWith('.md')) {
                // Process .md files
                const content = fs.readFileSync(filePath, 'utf8');

                // Process the file content
                const updatedContent = processCallback(filePath, content, clientData);

                // Save the updated content back to the file
                fs.writeFileSync(filePath, updatedContent, 'utf8');
                console.log(`Processed and saved: ${filePath}`);
            }
        });
    } catch (err) {
        console.error('Error processing file:', err);
    }
}

// ModifyMarkdownFiles(INPUT_DIR, ReplaceImageWikilinks);
let filenameToSlug = new Map();
ModifyMarkdownFiles(INPUT_DIR, AddExtraFrontmatter, filenameToSlug);
console.log(filenameToSlug);
ModifyMarkdownFiles(INPUT_DIR, ReplaceWikilinks, filenameToSlug);



