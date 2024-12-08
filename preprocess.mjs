import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import markdownit from 'markdown-it';
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
 * Replace all wikilink-style image attachment links with standard Markdown attachment links with absolute paths.
 * @important Assumes the the attachment links all point to files in "/attachments".
 * @param {string} inputString String to perform the wikilink replacement on
 * @return {string} Replaced string
 */
function ReplaceImageWikilinks(inputString) {
    // Step 1: Escape images inside code blocks and inline code
    const escapedCodeBlocks = inputString
        .replace(/```([\s\S]*?)```/g, (match) => match.replace(/!\[\[(.*?\.(?:jpg|jpeg|png|gif|webp|bmp|tiff))\]\]/gi, '[BLOCK IMAGE $1]'))
        .replace(/`([^`]+)`/g, (match, code) => `\`${code.replace(/!\[\[(.*?\.(?:jpg|jpeg|png|gif|webp|bmp|tiff))\]\]/gi, '[INLINE IMAGE $1]')}\``);

    // Step 2: Replace image links outside of code blocks
    const replacedImages = escapedCodeBlocks.replace(/!\[\[(.*?\.(?:jpg|jpeg|png|gif|webp|bmp|tiff))\]\]/gi, (match, filename) => {
        return `![${filename}](/attachments/${filename})`; // Replace with Markdown image syntax
    });

    // Step 3: Restore placeholders in code blocks and inline code
    return replacedImages
        .replace(/\[BLOCK IMAGE (.*?)\]/g, (match, filename) => `![[${filename}]]`)
        .replace(/\[INLINE IMAGE (.*?)\]/g, (match, filename) => `![[${filename}]]`);
}

// const str = fs.readFileSync("src2/projects/Architect.md", 'utf-8');
// console.log(ReplaceImageWikilinks(str))
// fs.writeFileSync("src2/projects/Architect2.md", ReplaceImageWikilinks(str), 'utf-8');

// Function to process all .md files in a directory
function processMarkdownFilesInDirectory(directoryPath) {
    try {
        // Read directory files and filter for .md files and directories
        const files = fs.readdirSync(directoryPath);

        files.forEach(file => {
            const filePath = path.join(directoryPath, file);

            if (fs.statSync(filePath).isDirectory()) {
                // Process .md files in subdirectory (1 level down)
                fs.readdirSync(filePath).forEach(subFile => {
                    const subFilePath = path.join(filePath, subFile);
                    if (subFile.endsWith('.md')) {
                        const content = fs.readFileSync(subFilePath, 'utf8');
                        const updatedContent = ReplaceImageWikilinks(content);
                        fs.writeFileSync(subFilePath, updatedContent, 'utf8');
                        console.log(`Processed: ${subFilePath}`);
                    }
                });
            } else if (file.endsWith('.md')) {
                // Process .md file in the current directory
                const content = fs.readFileSync(filePath, 'utf8');
                const updatedContent = ReplaceImageWikilinks(content);
                fs.writeFileSync(filePath, updatedContent, 'utf8');
                console.log(`Processed: ${filePath}`);
            }
        });
    } catch (err) {
        console.error('Error processing files:', err);
    }
}

processMarkdownFilesInDirectory(INPUT_DIR);


