---
permalink: projects/
---
# Hello

list all projects here, possibly group by topic

<ul>
  {% for page in collections.projects %}
      <li>
        <a href="{{ page.url }}">{{ page.data.title }}</a>
      </li>
  {% endfor %}
</ul>
