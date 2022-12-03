const Discord = require("discord.js")
const eventosLista = require("../models/eventosLista.js")

module.exports = {
    name: "famefarmx5",

    run: async(client,dados,consulta) => {
        if (dados.t == "MESSAGE_REACTION_REMOVE") return
        if(dados.d.user_id == "972697835856334858" || dados.d.user_id == "970043993914237038") return
        let participantes = consulta[0].participantes
        let limites = consulta[0].limites
        
        let msg = await client.channels.cache.get(dados.d.channel_id).messages.fetch(dados.d.message_id)
        let embed = msg.embeds[0]

        if(participantes.includes(dados.d.user_id)) {
            let index = 0
            for (i = 0; i < 10; i++){
                let verificar = embed.fields[i].value.search(dados.d.user_id)
                if (verificar != -1) {
                    index = i
                    
                }
            }
            switch (index){
                case 1:
                    limites[1].tank = limites[1].tank -1
                    embed.fields[1].name = `Tank (${limites[1].tank}/1)`
                    embed.fields[1].value = `-`

                    break
                case 2:
                    limites[2].mainHealer = limites[2].mainHealer -1
                    embed.fields[2].name = `Main Healer (${limites[2].mainHealer}/1)`
                    embed.fields[2].value = `-`

                    break
                case 3:
                    limites[3].partyHealer = limites[3].partyHealer -1
                    embed.fields[3].name = `Party Healer (${limites[3].partyHealer}/1)`
                    embed.fields[3].value = `-`
                    break
                case 4:
                    limites[4].badon = limites[4].badon -1
                    embed.fields[4].name = `Badônico (${limites[4].badon}/1)`
                    embed.fields[4].value = `-`

                    break
                case 5:
                    limites[5].suporte = limites[5].suporte -1
                    embed.fields[5].name = `Suporte (${limites[5].suporte}/1)`
                    embed.fields[5].value = `-`
                    
                    break
                case 6:
                    if (limites[6].dps == 1) {
                        limites[6].dps = limites[6].dps -1
                        embed.fields[6].name = `DPS (${limites[6].dps}/5)`
                        embed.fields[6].value = `-`
                    } else {
                        limites[6].dps = limites[6].dps -1
                        embed.fields[6].name = `DPS (${limites[6].dps}/5)`
                        embed.fields[6].value = embed.fields[6].value.replace(`<@${dados.d.user_id}>`,"")
                        embed.fields[6].value = embed.fields[6].value.replace("><",">\n<")
                    }
                    break
                case 8:
                    if (limites[8].reserva == 1){
                        limites[8].reserva = limites[8].reserva -1
                        embed.fields[8].name = `Reserva (${limites[8].reserva})`
                        embed.fields[8].value = `-`
                    } else {
                        limites[8].reserva = limites[8].reserva -1
                        embed.fields[8].name = `Reserva (${limites[8].reserva})`
                        embed.fields[8].value = embed.fields[8].value.replace(`<@${dados.d.user_id}>`,"")
                        embed.fields[8].value = embed.fields[8].value.replace("><",">\n<")
                    }
                    break

                case 9:
                    if (limites[9].nparticipar == 1){
                        limites[9].nparticipar = limites[9].nparticipar -1
                        embed.fields[9].name = `Não vou mais participar (${limites[9].nparticipar})`
                        embed.fields[9].value = `-`
                    } else {
                        limites[9].nparticipar = limites[9].nparticipar -1
                        embed.fields[9].name = `Não vou mais participar (${limites[9].nparticipar})`
                        embed.fields[9].value = embed.fields[9].value.replace(`<@${dados.d.user_id}>`,"")
                        embed.fields[9].value = embed.fields[9].value.replace("><",">\n<")
                    }
                    break
            }
        }

        if(dados.d.emoji.id === "965328874546266162" && limites[1].tank < 1) {
            limites[1].tank = limites[1].tank +1
            embed.fields[1].name = `Tank (${limites[1].tank}/1)`
            embed.fields[1].value = `<@${dados.d.user_id}>\n`
        }

        if(dados.d.emoji.id === "965329104197001236" && limites[2].mainHealer < 1) {
            limites[2].mainHealer = limites[2].mainHealer +1
            embed.fields[2].name = `Main Healer (${limites[2].mainHealer}/1)`
            embed.fields[2].value = `<@${dados.d.user_id}>\n`
        }

        if(dados.d.emoji.id === "965329345864421413" && limites[3].partyHealer < 1) {
            limites[3].partyHealer = limites[3].partyHealer +1
            embed.fields[3].name = `Party Healer (${limites[3].partyHealer}/1)`
            embed.fields[3].value = `<@${dados.d.user_id}>\n`
        }

        if(dados.d.emoji.id === "1017209196703395932" && limites[4].badon < 1) {
            limites[4].badon = limites[4].badon +1
            embed.fields[4].name = `Badônico (${limites[4].badon}/1)`
            embed.fields[4].value = `<@${dados.d.user_id}>\n`
        }

        if(dados.d.emoji.id === "965321528008900649" && limites[5].suporte < 1) {
            limites[5].suporte = limites[5].suporte +1
            embed.fields[5].name = `Suporte (${limites[5].suporte}/1)`
            embed.fields[5].value = `<@${dados.d.user_id}>\n`
        }

        if(dados.d.emoji.id === "970026432002658395" && limites[6].dps < 5) {
            limites[6].dps = limites[6].dps +1
            embed.fields[6].name = `DPS (${limites[6].dps}/5)`
            if(limites[6].dps == 1){
                embed.fields[6].value = `<@${dados.d.user_id}>`
            } else{
                embed.fields[6].value = embed.fields[6].value + `\n<@${dados.d.user_id}>`
            }
        }

        if(dados.d.emoji.id === "969804985321812038"){
            limites[8].reserva = limites[8].reserva +1
            embed.fields[8].name = `Reserva (${limites[8].reserva})`
            if(limites[8].reserva == 1){
                embed.fields[8].value = `<@${dados.d.user_id}>`
            } else {
                embed.fields[8].value = embed.fields[8].value + `\n<@${dados.d.user_id}>`
            }
        }

        if(dados.d.emoji.name === "❌"){
            limites[9].nparticipar = limites[9].nparticipar +1
            embed.fields[9].name = `Não vou mais participar (${limites[9].nparticipar})`
            if(limites[9].nparticipar == 1){
                embed.fields[9].value = `<@${dados.d.user_id}>`
            } else {
                embed.fields[9].value = embed.fields[9].value + `\n<@${dados.d.user_id}>`
            }
        }


        if (!(participantes.includes(dados.d.user_id))) {participantes.push(dados.d.user_id)}

        const update = await eventosLista.findOneAndUpdate(
            { eventoId: dados.d.message_id},
            {
                participantes: participantes,
                limites: limites,
            }
        )
        
        msg.edit({ embeds: [embed] })

    }
}

