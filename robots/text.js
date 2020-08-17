 const algorithmia = require('algorithmia')
 const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey
 const senteceBondaryDetection = require('sbd')

 async function robot(content) {
    await fetchContentFromWikipedia(content);
    sanitizeContent(content);
    breakContentIntoSentences(content);

    async function fetchContentFromWikipedia(content) {
        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2')
        const wikipediaResponde = await wikipediaAlgorithm.pipe(content.searchTerm)
        const wikipediaContent = wikipediaResponde.get()
       
        content.sourceContentOriginal = wikipediaContent.content
    }

    function sanitizeContent(content) {
        const withoutBlankLinesAndMakdown = removeBlankLinesAndMardown(content.sourceContentOriginal)
        const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMakdown)

        content.sourceContentSanitized = withoutDatesInParentheses
        function removeBlankLinesAndMardown(text) {
            const allLines = text.split('\n')
            
            const withoutBlankLinesAndMakdown = allLines.filter((line) => {
                if (line.trim().length === 0 || line.trim().startsWith('=')) {
                    return false
                }
                return true
            })
            return withoutBlankLinesAndMakdown.join(' ')
        }

        function removeDatesInParentheses(text) {
            return text.replace(/|((?:|([ˆ()]*|)|[ˆ()])*|)/gm, '').replace(/  /g,' ')
        }

    }

    function breakContentIntoSentences(content) {
        content.sentences = []

        const sentences = senteceBondaryDetection.sentences(content.sourceContentSanitized)
        sentences.forEach((sentence) => {
            content.sentences.push({
                text: sentence,
                keywords: [],
                images: []
            })
        })
    }


 }

 module.exports = robot