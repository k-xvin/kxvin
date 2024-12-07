---
# Page to list all "Note" articles
---
# Projects

{% for row in export.projects %}
<a href="{{ row.Title | slugify }}"> {{ row.Title }} </a>
{% endfor %}
