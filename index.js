const robots = {
    imput: require('./robots/imput.js'),
    text: require('./robots/text.js'),
    state: require('./robots/state.js'),
    image: require('./robots/image.js')
}

async function start() {
    robots.imput()
    await robots.text()
    await robots.image()

    const content = robots.state.load()
    console.dir(content, { depth: null})

}

start();