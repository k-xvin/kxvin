const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {

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
