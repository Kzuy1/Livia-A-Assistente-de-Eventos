const Discord = require("discord.js")

module.exports = {
  name: "event_create",
  type: Discord.ApplicationCommandType.ChatInput,
  description: "Cria um evento",
  options: [
    {
      name: "data",
      type: Discord.ApplicationCommandOptionType.String,
      description: "Cria um evento",
    }
  ],
  
  run: async (client, interaction) => {

    let ping = client.ws.ping;

    let embed_1 = new Discord.EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`Olá ${interaction.user}, meu ping está em \`calculando...\`.`)
    .setColor("Random");

    let embed_2 = new Discord.EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`Olá ${interaction.user}, meu ping está em \`${ping}ms\`.`)
    .setColor("Random");

    interaction.reply({ embeds: [embed_1], ephemeral: true  }).then( () => {
        setTimeout( () => {
            interaction.editReply({ embeds: [embed_2] })
        }, 2000)
    })
  }
}