const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {

    // Tag filters based on https://github.com/11ty/eleventy/issues/927#issuecomment-793493549
    eleventyConfig.addCollection('projectsTags', collections => {
        const tags = collections
            .getAll()
            .filter(item => item.data.tags !== undefined)
            .filter(item => item.data.tags.includes('projects'))
            .reduce((tags, item) => tags.concat(item.data.tags), [])
            .filter(tag => tag !== 'projects')
            .sort();
        return Array.from(new Set(tags))
    });

    eleventyConfig.addCollection('notesTags', collections => {
        const tags = collections
            .getAll()
            .filter(item => item.data.tags !== undefined)
            .filter(item => item.data.tags.includes('notes'))
            .reduce((tags, item) => tags.concat(item.data.tags), [])
            .filter(tag => tag !== 'notes')
            .sort();
        return Array.from(new Set(tags))
    });

    eleventyConfig.addFilter("postDate", (dateStr) => {
        return new Date(dateStr).toLocaleDateString("en-US", { timeZone: "UTC" });
    });

    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        // which file extensions to process
        extensions: "html",

        // Add any other Image utility options here:

        // optional, output image formats
        formats: ["jpeg"],
        // formats: ["auto"],

        // optional, output image widths
        widths: ["300"],

        // optional, attributes assigned on <img> override these values.
        defaultAttributes: {
            loading: "lazy",
            decoding: "async",
        },
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
            "css" // Manually specify that css files should be copied into the output
        ],
        passthroughFileCopy: true
    };
};
