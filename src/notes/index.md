---
# Page to list all "Note" articles
---
# Notes

{{export.notes | log }}
{% for row in export.notes %}
<a href="{{ row.Title | slugify }}"> {{ row.Title }} </a>
{% endfor %}
