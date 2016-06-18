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
        else if (session.message.text.startsWith('send link')) {
            session.send(
                "[This is a link](http://www.microsoft.com)\n\n" +
                "[Long link](https://login.microsoftonline.com/common/oauth2/v2.0/authorize?response_type=code&client_id=d9c54d46-cc60-4374-b3a4-9f42a291bbd9&client_secret=g4Np8Bsnd4Z3rvJe8FFyXUA&redirect_uri=https%3a%2f%2fsampleonedrivebot.azurewebsites.net%2fapi%2fOAuthCallback&scope=openid+profile+Files.Read&state=H4sIAAAAAAAEAHWMTQuCQBRFB3dFu6DfkToz4dJvJKIgW4c1zxR1RmYsqD_etpfSst3lnnPvmxBi3Q3oTJAFZs5pFz6buM-3U-8LocEYMkdoM-46lHmbCYVVISW0uJwhHKCFmy46Yl3UgN0Ku2PR9S3sJUS6fkCgBttx6Sj8bpdoKQniy81on5GOyr_7q5IP0KYYaiURrhGyKPNLFYTPTXNiO_CaODFA9YWlHRVXJxdRwtPTKygrj7cHXHwAs2k7YfcAAAA1)"
                );
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
                            title: "Rabbit",
                            photo_url: "http://cdn.kickvick.com/wp-content/uploads/2015/09/cutest-bunny-rabbits-01.jpg",
                            thumb_url: "http://cdn.kickvick.com/wp-content/uploads/2015/09/cutest-bunny-rabbits-01.jpg"
                        },
                        {
                            type: "photo",
                            id:"2",
                            title: "Bird",
                            photo_url: "http://data.whicdn.com/images/48243885/large.jpg",
                            thumb_url: "http://data.whicdn.com/images/48243885/large.jpg"
                        },
                        {
                            type: "photo",
                            id: "3",
                            title: "WTF?",
                            photo_url: "https://c1.staticflickr.com/7/6136/6041802514_8328b6ea6d_b.jpg",
                            thumb_url: "https://c1.staticflickr.com/7/6136/6041802514_8328b6ea6d_b.jpg"
                        }
                    ])
                }
            });
        }
        else if (session.message.text.includes("async")) {
            session.send("this is synchronous");
            session.send("this is asynchronous1");
            session.send("this is asynchronous2");
            session.send("this is asynchronous3");
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

server.listen(process.env.port || 2134, function () {
    console.log('%s listening to %s', server.name, server.url);
});
