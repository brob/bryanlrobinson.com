const sanityClient = require('@sanity/client')
module.exports = sanityClient({
    projectId: 'myf3wh95',
    dataset: 'production',
    useCdn: true // `false` if you want to ensure fresh data
})
