import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import CleanCSS from "clean-css";
import path from "path";
import markdownIt from "markdown-it";
import markdownItCallouts from "markdown-it-callouts";

export default async function (eleventyConfig) {

    // Markdown modifications
    eleventyConfig.setLibrary("md", markdownIt({
        html: true,
        breaks: true,
        linkify: true,
    })
        .use(markdownItCallouts, { defaultElementType: "blockquote", calloutTitleElementType: "p" })
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

        // optional, output image formats
        formats: ["jpeg", "svg" /*"gif",*/],

        // optional, output image widths
        widths: ["128", "512"],

        // TODO: figure how to make gifs move without blowing up Sharp
        // for animated gifs
        // sharpOptions: {
        //     animated: true,
        // },

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
