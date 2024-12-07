module.exports = function (eleventyConfig) {
    // eleventyConfig.addFilter("jsonParse", function (value) { return JSON.parse(value) });
    // eleventyConfig.addFilter("adjustImagePaths", function (value) {
    //     // Replace Markdown image reference paths with absolute ones
    //     // Regex: ![alt](path)
    //     return value.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    //         // Prepend `assets/` to the image path
    //         const newSrc = src.startsWith('/') ? `/assets${src}` : `/assets/${src}`;
    //         return `![${alt}](${newSrc})`;
    //     });
    // });

    // eleventyConfig.addPassthroughCopy({ "src/_data/export/*.{jpg,jpeg,png,gif}": "assets" })

    return {
        dir: {
            input: "src",
            output: "public",
        }
    };
};
