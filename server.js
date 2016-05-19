var restify = require('restify');
var builder = require('botbuilder');

// Get secrets from server environment
var botConnectorOptions = {
    appId: process.env.BOTFRAMEWORK_APPID,
    appSecret: process.env.BOTFRAMEWORK_APPSECRET,
    minSendDelay: 0,
    endpoint: "https://4147c91c.ngrok.io"
};

// Create bot
var bot = new builder.BotConnectorBot(botConnectorOptions);
bot.add('/', function (session) {
    session.send("1");
    console.log("sent 1");
    session.send("2");
    console.log("sent 2");
    session.send("3");
    console.log("sent 3");
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
