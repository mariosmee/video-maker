const robots = {
    imput: require('./robots/imput.js'),
    text: require('./robots/text.js'),
    state: require('./robots/state.js')
}

async function start() {
    robots.imput()
    await robots.text()

    const content = robots.state.load()
    console.dir(content, { depth: null})

}

start();