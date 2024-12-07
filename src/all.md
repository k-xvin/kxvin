# All

## Projects
{% for row in export.projects %}
<a href="{{ row.Title | slugify }}"> {{ row.Title }} </a>
{% endfor %}

## Notes
{% for row in export.notes %}
<a href="{{ row.Title | slugify }}"> {{ row.Title }} </a>
{% endfor %}