var restify = require('restify');
var builder = require('botbuilder');

// Get secrets from server environment
var botConnectorOptions = {
    appId: process.env.BOTFRAMEWORK_APPID,
    appSecret: process.env.BOTFRAMEWORK_APPSECRET
};

// Create bot
var bot = new builder.BotConnectorBot(botConnectorOptions);
bot.add('/', function (session) {

    //respond with user's message
    session.send("You said " + session.message.text);
});
bot.add('/channeldata', function(session) {
    session.send({
        type: "Message",
        to: session.message.from,
        from: session.message.to,
        replyToMessageId: session.message.id,
        conversationId: session.message.conversationId,
        channelConversationId: session.message.channelConversationId,
        channelMessageId: session.message.channelMessageId,
        participants: session.message.participants,
        totalParticipants: session.message.totalParticipants,
        channelData:
        {
            "method": "sendSticker",
            "parameters":
            {
                "sticker":
                {
                    "url": "https://upload.wikimedia.org/wikipedia/commons/3/33/LittleCarron.gif",
                    "mediaType": "image/gif"
                }
            }
        }
    });
});

// Setup Restify Server
var server = restify.createServer();

// Handle Bot Framework messages
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());

// Serve a static web page
server.get(/.*/, restify.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));

server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
