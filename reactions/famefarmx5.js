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
            for (i = 0; i < 7; i++){
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
                    limites[2].healer = limites[2].healer -1
                    embed.fields[2].name = `Healer (${limites[2].healer}/1)`
                    embed.fields[2].value = `-`

                    break
                case 3:
                    if (limites[3].dps == 1) {
                        limites[3].dps = limites[3].dps -1
                        embed.fields[3].name = `DPS (${limites[3].dps}/3)`
                        embed.fields[3].value = `-`
                    } else {
                        limites[3].dps = limites[3].dps -1
                        embed.fields[3].name = `DPS (${limites[3].dps}/3)`
                        embed.fields[3].value = embed.fields[3].value.replace(`<@${dados.d.user_id}>`,"")
                        embed.fields[3].value = embed.fields[3].value.replace("><",">\n<")
                    }
                    break
                case 5:
                    if (limites[5].reserva == 1){
                        limites[5].reserva = limites[5].reserva -1
                        embed.fields[5].name = `Reserva (${limites[5].reserva})`
                        embed.fields[5].value = `-`
                    } else {
                        limites[5].reserva = limites[5].reserva -1
                        embed.fields[5].name = `Reserva (${limites[5].reserva})`
                        embed.fields[5].value = embed.fields[5].value.replace(`<@${dados.d.user_id}>`,"")
                        embed.fields[5].value = embed.fields[5].value.replace("><",">\n<")
                    }
                    break
                case 6:
                    if (limites[6].nparticipar == 1){
                        limites[6].nparticipar = limites[6].nparticipar -1
                        embed.fields[6].name = `Não vou mais participar (${limites[6].nparticipar})`
                        embed.fields[6].value = `-`
                    } else {
                        limites[6].nparticipar = limites[6].nparticipar -1
                        embed.fields[6].name = `Não vou mais participar (${limites[6].nparticipar})`
                        embed.fields[6].value = embed.fields[6].value.replace(`<@${dados.d.user_id}>`,"")
                        embed.fields[6].value = embed.fields[6].value.replace("><",">\n<")
                    }
                    break
            }
        }

        if(dados.d.emoji.id === "965328874546266162" && limites[1].tank < 1) {
            limites[1].tank = limites[1].tank +1
            embed.fields[1].name = `Tank (${limites[1].tank}/1)`
            embed.fields[1].value = `<@${dados.d.user_id}>\n`
        }

        if(dados.d.emoji.id === "965329104197001236" && limites[2].healer < 1) {
            limites[2].healer = limites[2].healer +1
            embed.fields[2].name = `Healer (${limites[2].healer}/1)`
            embed.fields[2].value = `<@${dados.d.user_id}>\n`
        }

        if(dados.d.emoji.id === "970026432002658395" && limites[3].dps < 3) {
            limites[3].dps = limites[3].dps +1
            embed.fields[3].name = `DPS (${limites[3].dps}/3)`
            if(limites[3].dps == 1){
                embed.fields[3].value = `<@${dados.d.user_id}>`
            } else{
                embed.fields[3].value = embed.fields[3].value + `\n<@${dados.d.user_id}>`
            }
        }

        if(dados.d.emoji.id === "969804985321812038"){
            limites[5].reserva = limites[5].reserva +1
            embed.fields[5].name = `Reserva (${limites[5].reserva})`
            if(limites[5].reserva == 1){
                embed.fields[5].value = `<@${dados.d.user_id}>`
            } else {
                embed.fields[5].value = embed.fields[5].value + `\n<@${dados.d.user_id}>`
            }
        }

        if(dados.d.emoji.name === "❌"){
            limites[6].nparticipar = limites[6].nparticipar +1
            embed.fields[6].name = `Não vou mais participar (${limites[6].nparticipar})`
            if(limites[6].nparticipar == 1){
                embed.fields[6].value = `<@${dados.d.user_id}>`
            } else {
                embed.fields[6].value = embed.fields[6].value + `\n<@${dados.d.user_id}>`
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

