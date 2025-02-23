const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const CleanCSS = require("clean-css");
const path = require("path");

module.exports = function (eleventyConfig) {

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
        formats: ["jpeg"],

        // optional, output image widths
        widths: ["128", "512"],

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
