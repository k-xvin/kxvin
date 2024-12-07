---
# Format for an individual generated "Note" page
pagination:
  data: export.notes
  size: 1
  alias: note
permalink: "notes/{{ note.Title | slugify }}/"
---
{{ note.Body | jsonParse | adjustImagePaths }}