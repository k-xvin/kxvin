const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        // which file extensions to process
        extensions: "html",

        // Add any other Image utility options here:

        // optional, output image formats
        formats: ["jpeg"],
        // formats: ["auto"],

        // optional, output image widths
        // widths: ["auto"],

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
        }
    };
};
