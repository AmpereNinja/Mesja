const { Client, Intents, MessageEmbed } = require('discord.js');
const fetch = require("node-fetch")
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });


const coinflip = ["Head","Tails","Head"]; //<<<For coinflip



//A function to log messages
function Log(message) {
  console.log(`${Date()}: ${message}`)
}



//sends an embed when requested
function Embed(message, embed) {
  message.channel.send({embeds: [embed]})
}


//A function to get random quotes when called
function getQuote() {
  Log("Sent an HTTP GET Request to https://zenquotes.io/api/random")
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json();
      Log("Successfully fetched Data from https://zenquotes.io/api/random")
    })
    .then(data => {
      return "*" + data[0]["q"] + "* - **" + data[0]["a"] + "**"
    })
}

//when client has successfully logged in, it invokes this ready event
client.on("ready", () => {
  Log(`Logged in as ${client.user.tag}`)
})




//when someone sends a message it invokes this messageCreate event
client.on("messageCreate", msg => {


  //logs out the message sent in the server
  Log(`${msg.author.username} sent a message: ${msg.content}`);
  var message = msg.content.toUpperCase();
  if (msg.author.bot) return //<<< When the message was sent by a bot, return 0
  //responds Pong when the user sends Ping
  if (message === "MESJA PING") { //<<< When the message contains mesja ping,
    msg.reply("Pong")//<<<the bot replies Pong
  }





  //Sends an inspirational quote when the user sends mesja inspire
  if (message === "MESJA INSPIRE") {//<<<when someone sends "mesja inspire" command
    Log(`Quote requested by ${msg.author.username}`)//<<<Log out the request
    getQuote()//<<<call the getQuote function for random quote
      .then(quote => {//<<< When the function returns a value
        Log(`Successfully completed user request`)//<<<log out that the request was successful
        Log(`Respone: ${quote}`)//<<<Log out the quote
        msg.channel.send(quote)//<<<and finally send the quote as a message on the present channel
      })
  }





  //sends either Head or Tails when someone sends mesja coinflip
  if (message === "MESJA COINFLIP") {//<<<When someone sends mesja coinflip command
    Log(`Coinflip requested by ${msg.author.username}`)//<<<Log out the request
    const embed = new MessageEmbed()//<<<Creates an embed object
    .setColor('#bbff00')            //<<<Sets the theme color
    .setTitle(`Coin Flip`)          //<<<Sets title
    .setDescription(`${msg.author.username} flipped **${coinflip[Math.floor(Math.random() * 3)]}**`)//<<<Sets description
    Embed(msg, embed);//<<<Sends the message
    
  }
})

client.login(process.env.TOKEN)
