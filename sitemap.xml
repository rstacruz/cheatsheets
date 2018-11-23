---
layout: blank
type: other
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>{{ site.url }}/</loc></url>
{% for page in site.pages %}{% if page.type == 'article' %}<url><loc>{{ site.url }}{{ page.url | remove: '.html' }}</loc></url>
{% endif %}{% endfor %}
</urlset>
