var restify = require('restify');
var builder = require('botbuilder');

// Get secrets from server environment
var botConnectorOptions = {
    appId: process.env.BOTFRAMEWORK_APPID,
    appSecret: process.env.BOTFRAMEWORK_APPSECRET
};

// Create bot
var bot = new builder.BotConnectorBot(botConnectorOptions);
bot.add('/', [
    function (session) {
        if (session.message.text.startsWith('send choice')) {
            builder.Prompts.choice(session, "Which color?", "red|green|blue");
        }
        else if (session.message.text.startsWith('send photo')) {
            session.sendMessage({
                method: "sendPhoto",
                parameters: {
                    photo:
                    {
                        url: "https://pmcdeadline2.files.wordpress.com/2015/08/dbzf47.png",
                        mediaType: "image/png"
                    }

                }
            });
        }
        else if (session.message.text.startsWith('send sticker')) {
            session.sendMessage({
                method: "sendSticker",
                parameters: {
                    sticker: {
                        url: "https://upload.wikimedia.org/wikipedia/commons/3/33/LittleCarron.gif",
                        mediaType: "image/gif"
                    }
                }
            });
        }
        else if (session.message.text.startsWith('send multiple')) {
            session.sendMessage(
                [
                    {
                        method: "sendSticker",
                        parameters: {
                            sticker: {
                                url: "http://www.gstatic.com/webp/gallery/1.webp",
                                mediaType: "image/webp"
                            }
                        }
                    },
                    {
                        method: "sendMessage",
                        parameters: {
                            text: "This message is <b>HTML-formatted.</b>",
                            parse_mode: "HTML"
                        }
                    },
                    {
                        method: "sendDocument",
                        parameters: {
                            document: {
                                url: "https://kodu.blob.core.windows.net/kodu/MicrobitScan.zip",
                                mediaType: "application/zip"
                            }
                        }
                    }
                ]
            );
        }
        else if (session.message.text.startsWith('send document')) {
            session.sendMessage({
                method: "sendDocument",
                parameters: {
                    document: {
                        url: "https://kodu.blob.core.windows.net/kodu/KODU%20Help.docx",
                        mediaType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    }
                }
            });
        }
        else if (session.message.text.startsWith('dump message')) {
            session.send(`\`\`\`\n${JSON.stringify(session.message, null, '\t')}\`\`\``);
        }
        else if (session.message.channelData && session.message.channelData.inline_query) {
            session.sendMessage( {
                method: "answerInlineQuery",
                parameters: {
                    inline_query_id: session.message.channelData.inline_query.id,
                    results: JSON.stringify([
                        {
                            type: "photo",
                            id: "1",
                            title: "Misty Castle",
                            photo_url: "http://www.mrwallpaper.com/wallpapers/misty-castle.jpg",
                            thumb_url: "http://www.mrwallpaper.com/wallpapers/misty-castle.jpg"
                        },
                        {
                            type: "photo",
                            id:"2",
                            title: "Stonehenge",
                            photo_url: "http://www.mrwallpaper.com/wallpapers/stonehenge.jpg",
                            thumb_url: "http://www.mrwallpaper.com/wallpapers/stonehenge.jpg"
                        },
                        {
                            type: "photo",
                            id: "3",
                            title: "Dragon",
                            photo_url: "http://www.mrwallpaper.com/wallpapers/dragon-art-1920x1200.jpg",
                            thumb_url: "http://www.mrwallpaper.com/wallpapers/dragon-art-1920x1200.jpg"
                        }
                    ])
                }
            });
        }
        else if (session.message.text) {
            session.send(`You said: ${session.message.text}`);
        }
    },
    function (session, results) {
        session.send("good choice!");
    }
]);

// Setup Restify Server
var server = restify.createServer();

// Handle Bot Framework messages
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());

// Serve a static web page
server.get(/.*/, restify.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));

server.listen(process.env.port || 3074, function () {
    console.log('%s listening to %s', server.name, server.url);
});
