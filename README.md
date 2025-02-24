# Quickstart
1. `npm run sync` to copy Obsidian files to repo, then preprocess wikilinks and frontmatter
2. `npm run start` to spin up the Eleventy dev server
3. `npm run build` to output the final static site

# TODO
* Use markdown-it-callouts and markdown-it-wikilinks?
  * https://www.npmjs.com/package/markdown-it-callouts
  * https://github.com/jsepia/markdown-it-wikilinks
  * Or hand make it. Either way, use markdown-it's plugin system to modify markdown-isms instead of preprocessing regex?
* Apply layout to everything in content via:
  * https://www.11ty.dev/docs/data-template-dir/#apply-a-default-layout-to-multiple-templates
* Use eleventyComputed to grab the title, thumbnail image, date, and permalink from the file?
  * https://www.11ty.dev/docs/data-computed/
* With the above, we can eliminate the need for the preprocess script