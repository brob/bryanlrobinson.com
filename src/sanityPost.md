---js
{
    pagination: {
        data: "sanityPosts",
        size: 1,
        alias: "post",
        addAllPagesToCollections: true,
    },
    tags: ['posts'],
    permalink: '/blog/{{post.slug.current}}/index.html',
    layout: "layouts/post.njk",
    templateEngineOverride: "njk,md",
    eleventyComputed: {
        title: data => data.post.title,
        categories: data => data.post.categories,
        description: data => data.post.description,
    }
}
---

{{ post.body | safe }}
