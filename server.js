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
        else if (session.message.text.startsWith('gif doc')) {
            session.sendMessage({
                method: "sendDocument",
                parameters: {
                    document: {
                        url: "https://upload.wikimedia.org/wikipedia/commons/3/33/LittleCarron.gif"
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
        else if (session.message.text.startsWith('alt send sticker')) {
            session.send({
                channelData: {
                    "method": "sendSticker",
                    "parameters": {
                        "sticker":
                        {
                            "url": "https://67.media.tumblr.com/9f0cd010f94af9d679db6a98a9d8e28d/tumblr_nm2o71CWsa1tq4of6o1_400.gif",
                            "mediaType": "image/gif"
                        }
                    }
                }
            });
        }
        else if (session.message.text.startsWith('send webp')) {
            session.send({
                channelData: {
                    "method": "sendSticker",
                    "parameters": {
                        "sticker":
                        {
                            "url": "https://kodu.blob.core.windows.net:443/media/tumblr_nm2o71CWsa1tq4of6o1_400.webp",
                            "mediaType": "image/webp"
                        }
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
        else if (session.message.text.startsWith('send few buttons')) {
            session.sendMessage({
                method: "sendMessage",
                parameters: {
                    text: "Which file do you want?",
                    parse_mode: "Markdown",
                    reply_markup: JSON.stringify(
                    {
                    "inline_keyboard": [
                        [
                        {
                            "text": "Provisioning Azure Service Bus for federated authentication.docx",
                            "callback_data": "Provisioning Azure Service Bus for federated authentication.docx"
                        }
                        ]
                    ]})
                }
            })
        }
        else if (session.message.text.startsWith('send reply keyboard')) {
            session.sendMessage({
                method: "sendMessage",
                parameters: {
                    text: "This is a reply keyboard",
                    parse_mode: "Markdown",
                    reply_markup: JSON.stringify({
                        "keyboard": [
                            [{ text: "1" }, { text: "2" }, { text: "3" }],
                            [{ text: "4" }, { text: "5" }, { text: "6" }],
                            [{ text: "7" }, { text: "8" }, { text: "9" }],
                            [{ text: "*" }, { text: "0" }, { text: "#" }]
                        ]
                    })
                }
            })
        }
        else if (session.message.text.startsWith('send lot buttons')) {
            session.sendMessage({
                method: "sendMessage",
                parameters: {
                    text: "Which file do you want?",
                    parse_mode: "Markdown",
                    reply_markup: JSON.stringify(
                    {
                    "inline_keyboard": [
                        [
                        {
                            "text": "Provisioning Azure Service Bus for federated authentication.docx",
                            "callback_data": "Pre Service Bus for federated authentication.docx"
                        }
                        ],
                        [
                        {
                            "text": "Response to Challenges for Developers Using the Office 365 APIs.docx",
                            "callback_data": "Rr Developers Using the Office 365 APIs.docx"
                        }
                        ],
                        [
                        {
                            "text": "HTML and Silverlight.docx",
                            "callback_data": "HTML and Silverlight.docx"
                        }
                        ],
                        [
                        {
                            "text": "SLA Stories.pptx",
                            "callback_data": "SLA Stories.pptx"
                        }
                        ],
                        [
                        {
                            "text": "Windows 8 Commercial App Key Technologies-matwin8box.pptx",
                            "callback_data": "WApp Key Technologies-matwin8box.pptx"
                        }
                        ],
                        [
                        {
                            "text": "Microsoft Azure in the Enterprise With notes.pptx",
                            "callback_data": "Microsoft Azure in the Enterprise With notes.pptx"
                        }
                        ],
                        [
                        {
                            "text": "Identity for Devs.pptx",
                            "callback_data": "Identity for Devs.pptx"
                        }
                        ],
                        [
                        {
                            "text": "Passwords.one",
                            "callback_data": "Passwords.one"
                        }
                        ],
                        [
                        {
                            "text": "Enable Modern Business Applications.pptx",
                            "callback_data": "Enable Modern Business Applications.pptx"
                        }
                        ],
                        [
                        {
                            "text": "Enable Modern Business Applications-matwin8box.pptx",
                            "callback_data": "Eness Applications-matwin8box.pptx"
                        }
                        ],
                        [
                        {
                            "text": "Client Development Strategies 2.pptx",
                            "callback_data": "Client Development Strategies 2.pptx"
                        }
                        ],
                        [
                        {
                            "text": "Microsoft Azure in the Enterprise.pptx",
                            "callback_data": "Microsoft Azure in the Enterprise.pptx"
                        }
                        ],
                        [
                        {
                            "text": "Microsoft Azure in the Enterprise - Mat Velloso.pptx",
                            "callback_data": "Mhe Enterprise - Mat Velloso.pptx"
                        }
                        ],
                        [
                        {
                            "text": "Azure - Security Privacy Compliance Deep Dive.pptx",
                            "callback_data": "Arivacy Compliance Deep Dive.pptx"
                        }
                        ],
                        [
                        {
                            "text": "Fortify Architecture Assessment.docx",
                            "callback_data": "Fortify Architecture Assessment.docx"
                        }
                        ],
                        [
                        {
                            "text": "Enable Modern Business Applications.pptx",
                            "callback_data": "Enable Modern Business Applications.pptx"
                        }
                        ],
                        [
                        {
                            "text": "AMScan_Perf.pptx",
                            "callback_data": "AMScan_Perf.pptx"
                        }
                        ],
                        [
                        {
                            "text": "old Shape - HTML advanced - Velloso.pptx",
                            "callback_data": "old Shape - HTML advanced - Velloso.pptx"
                        }
                        ],
                        [
                        {
                            "text": "Windows 8 Commercial App Overview Pitch Deck-matwin8box.pptx",
                            "callback_data": "W App Overview Pitch Deck-matwin8box.pptx"
                        }
                        ],
                        [
                        {
                            "text": "Windows 8 Commercial App Overview Pitch Deck.pptx",
                            "callback_data": "Windows 8 Commercial App Overview Pitch Deck.pptx"
                        }
                        ],
                        [
                        {
                            "text": "Projects.one",
                            "callback_data": "Projects.one"
                        }
                        ],
                        [
                        {
                            "text": "Azure in Education.pptx",
                            "callback_data": "Azure in Education.pptx"
                        }
                        ],
                        [
                        {
                            "text": "Findings - Win 8 Metro application development.doc",
                            "callback_data": "F8 Metro application development.doc"
                        }
                        ],
                        [
                        {
                            "text": "DoL Application Risk Assessment Draft  0 5.docx",
                            "callback_data": "D Risk Assessment Draft  0 5.docx"
                        }
                        ],
                        [
                        {
                            "text": "CORS and feature comparison.docx",
                            "callback_data": "CORS and feature comparison.docx"
                        }
                        ],
                        [
                        {
                            "text": "Microsoft Azure in the Enterprise_April_17_2014.pptx",
                            "callback_data": "Me in the Enterprise_April_17_2014.pptx"
                        }
                        ],
                        [
                        {
                            "text": "test",
                            "callback_data": "test"
                        }
                        ],
                        [
                        {
                            "text": "Findings - Win 8 Metro application development.doc",
                            "callback_data": "Fetro application development.doc"
                        }
                        ],
                        [
                        {
                            "text": "LEAP 2015.pptx",
                            "callback_data": "LEAP 2015.pptx"
                        }
                        ],
                        [
                        {
                            "text": "Findings - Win 8 Metro application development.doc",
                            "callback_data": "Ftro application development.doc"
                        }
                        ],
                        [
                        {
                            "text": "Common Consent Dev Flow-Edward Wu-matwin8box.pptx",
                            "callback_data": "Cev Flow-Edward Wu-matwin8box.pptx"
                        }
                        ],
                        [
                        {
                            "text": "Windows 8 Commercial App Key Technologies.pptx",
                            "callback_data": "Windows 8 Commercial App Key Technologies.pptx"
                        }
                        ],
                        [
                        {
                            "text": "Identity for Devs.pptx",
                            "callback_data": "Identity for Devs.pptx"
                        }
                        ],
                        [
                        {
                            "text": "UI Mockup.pptx",
                            "callback_data": "UI Mockup.pptx"
                        }
                        ],
                        [
                        {
                            "text": "TechDays Lessons Learned.pptx",
                            "callback_data": "TechDays Lessons Learned.pptx"
                        }
                        ],
                        [
                        {
                            "text": "Guidance and issues.pptx",
                            "callback_data": "Guidance and issues.pptx"
                        }
                        ],
                        [
                        {
                            "text": "Azure REST Design Guidelines v2.1.docx",
                            "callback_data": "Azure REST Design Guidelines v2.1.docx"
                        }
                        ],
                        [
                        {
                            "text": "Approvals POC Final Findings.docx",
                            "callback_data": "Approvals POC Final Findings.docx"
                        }
                        ],
                        [
                        {
                            "text": "LEAP - BizTalk- Velloso.pptx",
                            "callback_data": "LEAP - BizTalk- Velloso.pptx"
                        }
                        ],
                        [
                        {
                            "text": "HTML 5 or Silverlight, making a rational choice.docx",
                            "callback_data": "Hight, making a rational choice.docx"
                        }
                        ],
                        [
                        {
                            "text": "Provisioning Azure Service Bus for federated authentication-matwin8box.docx",
                            "callback_data": "Pauthentication-matwin8box.docx"
                        }
                        ],
                        [
                        {
                            "text": "Findings - Win 8 Metro application development.doc",
                            "callback_data": "Findings - Win 8 Metro application development.doc"
                        }
                        ],
                        [
                        {
                            "text": "Provisioning Azure Service Bus for federated authentication.docx",
                            "callback_data": "Pice Bus for federated authentication.docx"
                        }
                        ],
                        [
                        {
                            "text": "HTML5 competition proposal.docx",
                            "callback_data": "HTML5 competition proposal.docx"
                        }
                        ],
                        [
                        {
                            "text": "Windows 8 Enterprise App Presentation.pptx",
                            "callback_data": "Windows 8 Enterprise App Presentation.pptx"
                        }
                        ],
                        [
                        {
                            "text": "Bring your own app POC.docx",
                            "callback_data": "Bring your own app POC.docx"
                        }
                        ],
                        [
                        {
                            "text": "DTM Architecture_v1_Final.docx",
                            "callback_data": "DTM Architecture_v1_Final.docx"
                        }
                        ],
                        [
                        {
                            "text": "Fortify Architecture Assessment.docx",
                            "callback_data": "Fortify Architecture Assessment.docx"
                        }
                        ],
                        [
                        {
                            "text": "OA 3.0 Web Services Versioning Strategy.docx",
                            "callback_data": "OA 3.0 Web Services Versioning Strategy.docx"
                        }
                        ],
                        [
                        {
                            "text": "DTM assessment.docx",
                            "callback_data": "DTM assessment.docx"
                        }
                        ]
                    ]
                    }) // JSON.stringify
                }
            }) // session.sendMessage
        }
        else if (session.message.channelData && session.message.channelData.inline_query) {
            var reply = {
                method:"answerInlineQuery",
                parameters:{
                    inline_query_id: session.message.channelData.inline_query.id,
                    results:JSON.stringify([
                        {
                            "type":"photo",
                            "id":"86c7683a-c2aa-4700-b96e-b0b81197ed3a",
                            "title":"response from the_memebot",
                            "photo_url":"https://memebotstorage.blob.core.windows.net/savedmemes/e81b2f60-4f1f-4a59-8661-250d81cd4f10.png",
                            "thumb_url":"https://memebotstorage.blob.core.windows.net/savedmemes/e81b2f60-4f1f-4a59-8661-250d81cd4f10.png"
                        },
                        {
                            "type":"photo",
                            "id":"3179b9fa-a45d-4644-8e90-da7f17a703f4",
                            "title":"response from the_memebot",
                            "photo_url":"https://memebotstorage.blob.core.windows.net/savedmemes/5c04de79-7ed2-49c1-ac97-8f1fd5449096.png",
                            "thumb_url":"https://memebotstorage.blob.core.windows.net/savedmemes/5c04de79-7ed2-49c1-ac97-8f1fd5449096.png"
                        },
                        {
                            "type":"photo",
                            "id":"86ac1d74-b2e5-4cc5-85e1-d053db19aa9d",
                            "title":"response from the_memebot",
                            "photo_url":"https://memebotstorage.blob.core.windows.net/savedmemes/2330f9a3-0ca3-4388-a7aa-d798b1c86f19.png",
                            "thumb_url":"https://memebotstorage.blob.core.windows.net/savedmemes/2330f9a3-0ca3-4388-a7aa-d798b1c86f19.png"
                        },
                        {
                            "type":"photo",
                            "id":"32b74138-ec17-4d08-bdbb-927d6ea7d73a",
                            "title":"response from the_memebot",
                            "photo_url":"https://memebotstorage.blob.core.windows.net/savedmemes/47deef2b-6885-4520-9d36-7f0b777b85e5.png",
                            "thumb_url":"https://memebotstorage.blob.core.windows.net/savedmemes/47deef2b-6885-4520-9d36-7f0b777b85e5.png"
                        }
                    ])
                }
            };
            session.sendMessage(reply);
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


