const Bottr = require('bottr')
const BottrApp = require('bottr-app')
const bot = new Bottr.Bot()

bot.use(new BottrApp())
bot.use(new Bottr.MemoryStorage())


bot.on('message_received', function(message, session, next) {

 // Get existing context or use defaults if values don't exist
 var context = session.getUserContext({
   messageCount: 0,
   wordCount: 0,
 })

 // Calculate new statistics
 context.messageCount ++
 var words = message.text.split(" ")
 context.wordCount += words.length

 //Store new values into context
 session.updateUserContext(context)

 //Tell bot to let other handlers process the message
 next()
});





bot.hears(/\/stats/, function(message, session) {

 var context = session.getUserContext()

 // Send the total number of messages to the
 // user
 session.send("Total Message Count: " + context.messageCount)

 // Send the total number of words to the
 // user
 session.send("Total Word Count: " + context.wordCount)
});

bot.hears([/.+/], function(message, session) {
  // Repeat what the user sent us
  session.send(message.text)
});










bot.listen()
