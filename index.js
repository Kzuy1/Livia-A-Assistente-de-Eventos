const Discord = require("discord.js")
const config = require("./config.json")
const client = new Discord.Client({ intents: [ Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessageReactions]});
const { connect, default: mongoose } = require('mongoose');
const eventosLista = require("./models/eventosLista.js")
module.exports = client

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Error`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)
   }
})

client.on("raw", async dados => {
  if (dados.t !== "MESSAGE_REACTION_ADD" && dados.t !== "MESSAGE_REACTION_REMOVE") return
  console.log(dados)
  let consulta = await eventosLista?.find({ eventoId: dados.d.message_id }).exec()
  if (consulta != false) {
    try {
      const commandReactions = require(`./reactions/${consulta[0].evento}.js`)
      commandReactions.run(client, dados, consulta)
    } catch (err) {
      console.log(err)
    }
  }
})

client.on('ready', () => {
  console.log(`Estou online!`)
})

client.slashCommands = new Discord.Collection()

require('./handler')(client)

async function connectToDatabase() {
  const connection = await connect(config.mongo_url, {})
  console.log('Database conectada com sucesso!')

}
connectToDatabase()

client.login(config.token)