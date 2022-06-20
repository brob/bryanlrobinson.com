const blocksToMd = require('@sanity/block-content-to-markdown')
const sanityClient = require('../utils/sanityClient')
const serializers = {
  types: {
    code: props => '```' + props.node.language + '\n' + props.node.code + '\n```',
    youtube: props => `<div style="position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; margin-bottom: 1rem;">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/${props.node.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"  style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;" allowfullscreen></iframe>
    </div>`,
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