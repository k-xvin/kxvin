import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import CleanCSS from "clean-css";
import fs from "fs";
import path from "path";
import markdownIt from "markdown-it";
import markdownItCallouts from "markdown-it-callouts";
import slugify from "@sindresorhus/slugify";

let slugsMap = null;

// Builds a Map of filename -> URL slug for wikilink resolution, lazily populated on first call
function getSlugsMap() {
    if (slugsMap) return slugsMap;

    slugsMap = new Map();
    const contentDir = path.join(process.cwd(), 'src/content');

    function walkDir(dir) {
        try {
            for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
                const fullPath = path.join(dir, entry.name);
                if (entry.isDirectory()) {
                    walkDir(fullPath);
                } else if (entry.name.endsWith('.md')) {
                    const content = fs.readFileSync(fullPath, 'utf8');
                    const match = content.match(/^# (.+)/m);
                    const title = match?.[1] || entry.name;
                    const slug = slugify(title);
                    slugsMap.set(path.parse(entry.name).name, '/' + slug);
                }
            }
        } catch (err) {
            console.error('Error building slugs map:', err);
        }
    }

    walkDir(contentDir);
    return slugsMap;
}

// Parses [[page]] and [[page|alt]] links, resolves to URL slugs or attachment paths
function wikilinkPlugin(md, getSlugs, attachmentsDir) {
    md.inline.ruler.push('wikilink', (state, silent) => {
        const match = state.src.slice(state.pos).match(/^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/);
        if (!match) return false;

        if (silent) {
            state.pos += match[0].length;
            return true;
        }

        const filename = match[1];
        const text = match[2] || filename;
        const slugs = getSlugs();
        const slug = slugs.get(filename);

        // Case 1: wikilink resolves to a slug
        if (slug) {
            const token = state.push('wikilink', 'a', 0);
            token.attrSet('href', slug);
            token.attrSet('class', 'internal');
            token.children = [{ type: 'text', content: text }];
            state.pos += match[0].length;
            return true;
        }

        // Case 2: attachment exists
        const attachmentPath = path.join(attachmentsDir, filename);
        if (fs.existsSync(attachmentPath)) {
            const token = state.push('wikilink', 'a', 0);
            token.attrSet('href', '/content/attachments/' + encodeURI(filename));
            token.attrSet('class', 'internal');
            token.children = [{ type: 'text', content: text }];
            state.pos += match[0].length;
            return true;
        }

        // Case 3: render as plain text
        const token = state.push('text', '', 0);
        token.content = text;
        state.pos += match[0].length;
        return true;
    });

    // Add renderer for wikilink tokens
    md.renderer.rules.wikilink = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const text = token.children?.[0]?.content || '';
        const attrs = self.renderAttrs(token);
        return `<a${attrs}>${text}</a>`;
    };
}

// Image wikilinks: ![[image.jpg]] -> /content/attachments/image.jpg
function imageWikilinkPlugin(md) {
    md.inline.ruler.push('imagewikilink', (state, silent) => {
        const match = state.src.slice(state.pos).match(/^!\[\[(.+?\.(?:jpg|svg|jpeg|png|gif|webp|bmp|tiff))\]\]/i);
        if (!match) return false;

        const filename = match[1];

        if (!silent) {
            const token = state.push('image_inline', 'img', 0);
            token.attrSet('src', `/content/attachments/${filename}`);
            token.attrSet('alt', filename);
        }

        state.pos += match[0].length;
        return true;
    });
}

// When consecutive images have no blank line between them in markdown,
// render them in a <div class="image-grid"> instead of a <p>.
//
// In markdown-it, a paragraph <p> is always three tokens: open, inline, close.
// Check if the inline token's children are *only* images (ignoring
// line breaks between them) and swap the <p> wrapper (open, close) for a <div>.
function imageGridPlugin(md) {
    function isParagraphConsecutiveImages(tokens, i) {
        // inline is always the middle token
        const inline = tokens[i + 1];
        if (!inline || inline.type !== "inline") return false;
        // Strip softbreaks (new line without blank line inbetween), then check that only images remain
        // Also check for 'image_inline' type created by our wikilink plugin
        const gridCandidate = (inline.children || []).filter((t) => t.type !== "softbreak");
        return gridCandidate.length >= 2 && gridCandidate.every((t) => t.type === "image" || t.type === "image_inline");
    }

    // NOTE: isParagraphConsecutiveImages is called independently in to avoid sharing state between
    // the open and close renderers

    // Open, will become <p> but swap for <div> if it's an image grid
    md.renderer.rules.paragraph_open = (tokens, i, options, env, self) =>
        isParagraphConsecutiveImages(tokens, i)
            ? '<div class="image-grid">'
            : self.renderToken(tokens, i, options);

    // Close, will become </p> but swap for </div> if it's an image grid
    md.renderer.rules.paragraph_close = (tokens, i, options, env, self) =>
        isParagraphConsecutiveImages(tokens, i - 2)
            ? "</div>"
            : self.renderToken(tokens, i, options);
}

// Tag collection filters based on https://github.com/11ty/eleventy/issues/927#issuecomment-793493549
function getTagCounts(items, parentTag) {
    const tagCounts = new Map();
    let total = 0;

    (items || [])
        .filter((item) => item.data.tags !== undefined)
        .forEach((item) => {
            total += 1;
            item.data.tags.forEach((tag) => {
                if (tag !== parentTag) {
                    tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
                }
            });
        });
    tagCounts.set("all", total);

    return Object.fromEntries([...tagCounts.entries()].sort((a, b) => b[1] - a[1]));
}

// Pagination from the tag counts object
export default async function (eleventyConfig) {

    // Build slugs map at start for wikilink resolution
    const slugsMap = getSlugsMap();

    // Set default layout for all markdown content files
    eleventyConfig.addGlobalData("layout", "post.njk");

    // Configure markdown parser
    eleventyConfig.setLibrary(
        "md",
        markdownIt({
            html: true,
            breaks: true,
            linkify: true,
        })
            // Special call-out quote block
            .use(markdownItCallouts, { defaultElementType: "blockquote", calloutTitleElementType: "p" })
            // Special wrapper around consecutive images
            .use(imageGridPlugin)
            // Wikilink support: ![[image.jpg]] first, then [[link]]
            .use(imageWikilinkPlugin)
            .use(wikilinkPlugin, () => slugsMap, path.join(process.cwd(), 'src/content/attachments'))
    );

    // Collections based on file path, sorted by date (newest first)
    // Note: Eleventy does not pick up eleventyComputed tags for auto-generated collections,
    // so these must be defined explicitly even though the "projects"/"notes" tags exist via computed data.
    const isProject = (item) => item.data.page?.filePathStem?.startsWith('/content/projects');
    const isNote = (item) => item.data.page?.filePathStem?.startsWith('/content/notes');

    eleventyConfig.addCollection("projects", (c) =>
        c.getAll()
            .filter(isProject)
            .sort((a, b) => new Date(b.data.created) - new Date(a.data.created))
    );
    eleventyConfig.addCollection("notes", (c) =>
        c.getAll()
            .filter(isNote)
            .sort((a, b) => new Date(b.data.created) - new Date(a.data.created))
    );

    // Tag counts for projects/notes pages - used by tags macro and for pagination
    eleventyConfig.addCollection("projectTags", (c) =>
        getTagCounts(c.getAll().filter(isProject), "projects")
    );
    eleventyConfig.addCollection("noteTags", (c) =>
        getTagCounts(c.getAll().filter(isNote), "notes")
    );

    // Filter to get keys from tag counts object for pagination
    eleventyConfig.addFilter("keys", (obj) => Object.keys(obj).filter(k => k !== 'all'));

    // Make date formatting filter available for templates
    eleventyConfig.addFilter("postDate", (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const day = String(date.getUTCDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    });

    // Make css minifying filter available for templates
    eleventyConfig.addFilter("cssmin", (code) => new CleanCSS({}).minify(code).styles);

    // Add unique filter for tags macro
    eleventyConfig.addFilter("unique", (arr) => [...new Set(arr)]);

    // Set up image transform plugin to convert images into standard format and size
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        // which file extensions to process
        extensions: "html",

        // prefer webp, fall back to original input format
        formats: ["webp", null],

        // optional, output image widths
        widths: ["128", "512"],

        // allow animated webp
        sharpOptions: {
            animated: true,
        },

        // optional, attributes assigned on <img> override these values.
        defaultAttributes: {
            loading: "lazy",
            decoding: "async",
            sizes: "auto",
        },
    });

    // Create the pagefind index after rendering
    // https://permortensen.com/adding-pagefind-to-an-eleventy-site/
    eleventyConfig.on("eleventy.after", async ({ dir }) => {
        const inputPath = dir.output;
        const outputPath = path.join(dir.output, "pagefind");

        console.log("Creating Pagefind index of %s", inputPath);

        const pagefind = await import("pagefind");
        const { index } = await pagefind.createIndex();
        const { page_count } = await index.addDirectory({ path: inputPath });
        await index.writeFiles({ outputPath });

        console.log("Created Pagefind index of %i pages in %s", page_count, outputPath);
    });

    // Pass-through copy the background image at full resolution
    eleventyConfig.addPassthroughCopy({ "src/content/attachments/nightsky2.png": "background.png" });

    // Pass-through copy all non-image files from attachments
    eleventyConfig.addPassthroughCopy({
        "src/content/attachments/!(*.jpg|*.jpeg|*.png|*.gif|*.svg|*.webp|*.bmp|*.tiff)": "content/attachments/",
    });

    return {
        dir: {
            input: "src",
            output: "public",
            includes: "_includes",
            data: "_data",
        },
        templateFormats: ["md", "njk"],
        markdownTemplateEngine: false,
    };
};