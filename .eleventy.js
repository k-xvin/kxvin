import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import CleanCSS from "clean-css";
import path from "path";
import markdownIt from "markdown-it";
import markdownItCallouts from "markdown-it-callouts";

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
        if (!inline || inline.type !== 'inline') return false;
        // Strip softbreaks (new line without blank line inbetween), then check that only images remain
        const gridCandidate = (inline.children || []).filter(t => t.type !== 'softbreak');
        return gridCandidate.length >= 2 && gridCandidate.every(t => t.type === 'image');
    }

    // NOTE: isParagraphConsecutiveImages is called independently in to avoid sharing state between
    // the open and close renderers

    // Open, will become <p> but swap for <div> if it's an image grid
    md.renderer.rules.paragraph_open = (tokens, i, options, env, self) =>
        isParagraphConsecutiveImages(tokens, i) ? '<div class="image-grid">' : self.renderToken(tokens, i, options);

    // Close, will become </p> but swap for </div> if it's an image grid
    md.renderer.rules.paragraph_close = (tokens, i, options, env, self) =>
        isParagraphConsecutiveImages(tokens, i - 2) ? '</div>' : self.renderToken(tokens, i, options);
}

export default async function (eleventyConfig) {

    // Markdown modifications
    eleventyConfig.setLibrary("md", markdownIt({
        html: true,
        breaks: true,
        linkify: true,
    })
        // Special call-out quote block
        .use(markdownItCallouts, { defaultElementType: "blockquote", calloutTitleElementType: "p" })
        // Special wrapper around consecutive images
        .use(imageGridPlugin)
    );

    // https://permortensen.com/adding-pagefind-to-an-eleventy-site/
    eleventyConfig.on("eleventy.after", async function ({ dir }) {
        const inputPath = dir.output;
        const outputPath = path.join(dir.output, "pagefind");

        console.log("Creating Pagefind index of %s", inputPath);

        const pagefind = await import("pagefind");
        const { index } = await pagefind.createIndex();
        const { page_count } = await index.addDirectory({ path: inputPath });
        await index.writeFiles({ outputPath });

        console.log(
            "Created Pagefind index of %i pages in %s",
            page_count,
            outputPath
        );
    });

    function getTagCounts(collections, parentTag) {
        const tagCounts = new Map();
        let total = 0;

        collections.getAll()
            .filter(item => item.data.tags !== undefined)
            .filter(item => item.data.tags.includes(parentTag))
            .forEach(item => {
                total += 1;
                item.data.tags.forEach(tag => {
                    if (tag !== parentTag) {
                        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
                    }
                });
            });
        tagCounts.set("all", total);

        // Sort by count descending and return object for easier use in templates
        return Object.fromEntries(
            [...tagCounts.entries()].sort((a, b) => b[1] - a[1])
        );
    }

    // Tag filters based on https://github.com/11ty/eleventy/issues/927#issuecomment-793493549
    eleventyConfig.addCollection('projectTags', collections => {
        return getTagCounts(collections, "projects");
    });

    eleventyConfig.addCollection('noteTags', collections => {
        return getTagCounts(collections, "notes");
    });

    eleventyConfig.addFilter("postDate", (dateStr) => {
        // return new Date(dateStr).toLocaleDateString("en-US", { timeZone: "UTC" });
        const date = new Date(dateStr);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const day = String(date.getUTCDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    });

    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        // which file extensions to process
        extensions: "html",

        // Add any other Image utility options here:

        // prefer webp, fall back to original input format
        formats: ["webp", null],

        // optional, output image widths
        widths: ["128", "512"],

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

    eleventyConfig.addFilter("cssmin", function (code) {
        return new CleanCSS({}).minify(code).styles;
    });

    eleventyConfig.addPassthroughCopy({ "src/content/attachments/nightsky2.png": "background.png" });
    // Pass-through copy all non-image files from attachments
    eleventyConfig.addPassthroughCopy({
        "src/content/attachments/!(*.jpg|*.jpeg|*.png|*.gif|*.svg|*.webp|*.bmp|*.tiff)": "content/attachments/"
    });

    return {
        dir: {
            input: "src",
            output: "public",
        },
        templateFormats: [
            "md",
            "njk",
        ],
    };
};
