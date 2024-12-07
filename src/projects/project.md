---
# Format for an individual generated "Project" page
pagination:
  data: export.projects
  size: 1
  alias: project
permalink: "projects/{{ project.Title | slugify }}/"
---
{{ project.Body | jsonParse | adjustImagePaths }}