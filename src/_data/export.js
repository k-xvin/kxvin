const { parse } = require("csv-parse/sync");
const fs = require("fs");
const path = require('path');

const EXPORT_DIR_PATH = "src/_data/export/";

// Parse exported Notion data into 11ty data object to be used in generating pages
function ParseExport() {
	// Read csv and export directory
	const contentFile = fs.readFileSync(`${EXPORT_DIR_PATH}contents.csv`)
	let entries = parse(contentFile, { columns: true, skip_empty_lines: true, bom: true, objname: "Title" });
	let projects = []
	let notes = []
	const exportDir = fs.readdirSync(EXPORT_DIR_PATH);

	// Parse md files into json data
	// ENTRY FORMAT: 
	// {
	// 	Title: 'this name has a colon: woohoo',
	// 	Type: 'Note',
	// 	Topic: 'misc',
	// 	Status: 'Published',
	// 	Created: 'September 4, 2024 8:03 PM',
	// 	Start: '',
	// 	End: '',
	// 	Edited: 'September 10, 2024 8:58 PM',
	// 	Body: '"woah colons ::::::\\n\\nPICTUYRE!!\\n\\n![image.png](image.png)"'
	// }
	exportDir.forEach(file => {
		if (path.extname(file).toLowerCase() === '.md') {
			const fullPath = path.join(EXPORT_DIR_PATH, file);
			try {
				console.log(`File: ${file}`);
				const content = fs.readFileSync(fullPath, 'utf8');
				const lines = content.split(/\r?\n/);

				// Title is the first line, minus the '# '
				const title = lines.at(0).substring(2).trim()

				// Body begins after the second empty line
				let emptyLineCount = 0;
				let bodyStartIndex = 0;
				for (let i = 0; i < lines.length && emptyLineCount < 2; i++) {
					if (lines[i].trim() === '') emptyLineCount++;
					bodyStartIndex = i;
				}
				const bodyLines = lines.slice(bodyStartIndex);
				const bodyContent = bodyLines.join('\n').trim();

				// Add an extra field into entries
				entries[title]["Body"] = JSON.stringify(bodyContent);

				// Sort projects and notes
				if (entries[title].Type == 'Project')
					projects.push(entries[title]);
				else
					notes.push(entries[title]);

				// Sort by topic
				// TODO

				console.log('---');
			} catch (error) {
				console.error(`Error reading file ${file}:`, error);
			}
		}
	});

	return { "projects": projects, "notes": notes };
}

module.exports = function () {
	const data = ParseExport()
	console.log(data)
	return data;
};