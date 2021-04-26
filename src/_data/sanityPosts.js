const blocksToMd = require('@sanity/block-content-to-markdown')
const sanityClient = require('../utils/sanityClient')
const serializers = {
  types: {
    code: props => '```' + props.node.language + '\n' + props.node.code + '\n```',
    undefined: props => `eeps`
  }
}
const query = `*[_type == "blog"] | order(publishDate desc){
  ...,
  "featuredImg": featuredImg.asset->url,
  body[]{
    ..., 
    asset->{
      ...,
      "_key": _id
    }
  }
}`

function prepNewsletter(data) {
    data.body = blocksToMd(data.body,{serializers})
    data.date = new Date(data.publishDate)

    return data
}


module.exports = async function() {
    const data = await sanityClient.fetch(query)
    const preppedData = data.map(prepNewsletter)
    return preppedData
}