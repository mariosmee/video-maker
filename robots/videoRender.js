const state = require('./state.js')
const videoshow = require('videoshow')

async function robot() {
    console.log('> [video-render] Starting...')
    const content = state.load()
    
    await createYoutubeVideo(content)

    state.save(content)

    async function createYoutubeVideo(content) {
        return new Promise((resolve, reject) =>{
            const captionArray = content.sentences
        
            const audio = './templates/1/newsroom.mp3'

            var audioParams = {
                fade: true,
                delay: 0.5 // seconds
            }

            var options = {
                fps: 25,
                loop: 10, // seconds
                transition: true,
                transitionDuration: 1, // seconds
                videoBitrate: 1024,
                videoCodec: 'libx264',
                size: '1920x?',
                audioBitrate: '128k',
                audioChannels: 2,
                format: 'mp4',
                pixelFormat: 'yuv420p',
                captionDelay: 350,
                transition: true,
                useSubRipSubtitles: false, // Use ASS/SSA subtitles instead 
                subtitleStyle: {
                    Fontname: 'Verdana',
                    Fontsize: '26',
                    PrimaryColour: '11861244',
                    SecondaryColour: '11861244',
                    TertiaryColour: '11861244',
                    BackColour: '-2147483640',
                    Bold: '2',
                    Italic: '0',
                    BorderStyle: '2',
                    Outline: '2',
                    Shadow: '3',
                    Alignment: '0', // left, middle, right
                    MarginL: '40',
                    MarginR: '60',
                    MarginV: '40'
                }
            }

            var images = [
            {
                path: './content/0-converted.png',
                caption: captionArray[0].text
            }, {
                path: './content/1-converted.png',
                caption: captionArray[1].text,
                //loop: 5
            }, {
                path: './content/2-converted.png',
                caption: captionArray[2].text,
                //captionStart: 2,
                //captionEnd: 3
            }, {
                path: './content/3-converted.png',
                caption: captionArray[3].text,
                loop: 5
            }, {
                path: './content/4-converted.png',
                caption: captionArray[4].text
            }, {
                path: './content/5-converted.png',
                caption: captionArray[5].text
            }, {
                path: './content/6-converted.png',
                caption: captionArray[6].text
            }
            ]

            videoshow(images, options)
            .audio(audio, audioParams)
            .save('./content/video.mp4')
            .on('start', function (command) {
                console.log('ffmpeg process started:', command)
            })
            .on('error', function (err) {
                return reject(err),
                console.error('Error:', err)
            })
            .on('end', function (output) {
                
                console.log('Video created in:', output)
                resolve()
            })
        })

    }
}

module.exports = robot