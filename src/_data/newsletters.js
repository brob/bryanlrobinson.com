const blocksToHtml = require('@sanity/block-content-to-html')
const sanityClient = require('../utils/sanityClient')
const h = blocksToHtml.h
const serializers = {
    types: {
      code: props => (
        h('pre', {className: props.node.language},
          h('code', props.node.code)
        )
      )
    }
  }


const query = `*[_type == "newsletter"] {
    ...,
    bookmarks[]->
} | order(_createdAt desc)`


function prepNewsletter(data) {
    data.date = new Date(data.publishDate)
    data.opening = blocksToHtml({
        blocks: data.opening,
        serializers: serializers
      })

    return data
}

module.exports = async function() {
    const data = await sanityClient.fetch(query)
    const preppedData = data.map(prepNewsletter)

    return preppedData
}