const Discord = require("discord.js")
const eventosLista = require("../models/eventosLista.js")

module.exports = {
    name: "worldboss",

    run: async(client,dados,consulta) => {
        if (dados.t == "MESSAGE_REACTION_REMOVE") return
        if(dados.d.user_id == "972697835856334858" || dados.d.user_id == "970043993914237038") return
        let participantes = consulta[0].participantes
        let limites = consulta[0].limites
        
        let msg = await client.channels.cache.get(dados.d.channel_id).messages.fetch(dados.d.message_id)
        let embed = msg.embeds[0]

        if(participantes.includes(dados.d.user_id)) {
            let index = 0
            for (i = 0; i < 13; i++){
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
                    limites[4].prisma = limites[4].prisma -1
                    embed.fields[4].name = `Prisma (${limites[4].prisma}/1)`
                    embed.fields[4].value = `-`

                    break
                case 5:
                    limites[5].shadowcaller = limites[5].shadowcaller -1
                    embed.fields[5].name = `Shadowcaller (${limites[5].shadowcaller}/1)`
                    embed.fields[5].value = `-`
                    
                    break
                case 6: 
                    limites[6].fulgurante = limites[6].fulgurante -1
                    embed.fields[6].name = `Fulgurante (${limites[6].fulgurante}/1)`
                    embed.fields[6].value = `-`

                    break
                case 7:
                    limites[7].enigmatico = limites[7].enigmatico -1
                    embed.fields[7].name = `Enigmático (${limites[7].enigmatico}/1)`
                    embed.fields[7].value = `-`

                    break
                case 8:
                    if (limites[8].dps == 1) {
                        limites[8].dps = limites[8].dps -1
                        embed.fields[8].name = `DPS (${limites[8].dps}/2)`
                        embed.fields[8].value = `-`
                    } else {
                        limites[8].dps = limites[6].dps -1
                        embed.fields[8].name = `DPS (${limites[8].dps}/2)`
                        embed.fields[8].value = embed.fields[8].value.replace(`<@${dados.d.user_id}>`,"")
                        embed.fields[8].value = embed.fields[8].value.replace("><",">\n<")
                    }

                    break
                case 9:
                    limites[9].scout = limites[9].scout -1
                    embed.fields[9].name = `Scout (${limites[9].scout}/1)`
                    embed.fields[9].value = `-`

                    break
                case 11:
                    if (limites[11].reserva == 1){
                        limites[11].reserva = limites[11].reserva -1
                        embed.fields[11].name = `Reserva (${limites[11].reserva})`
                        embed.fields[11].value = `-`
                    } else {
                        limites[11].reserva = limites[11].reserva -1
                        embed.fields[11].name = `Reserva (${limites[11].reserva})`
                        embed.fields[11].value = embed.fields[11].value.replace(`<@${dados.d.user_id}>`,"")
                        embed.fields[11].value = embed.fields[11].value.replace("><",">\n<")
                    }
                    break

                case 12:
                    if (limites[12].nparticipar == 1){
                        limites[12].nparticipar = limites[12].nparticipar -1
                        embed.fields[12].name = `Não vou mais participar (${limites[12].nparticipar})`
                        embed.fields[12].value = `-`
                    } else {
                        limites[12].nparticipar = limites[12].nparticipar -1
                        embed.fields[12].name = `Não vou mais participar (${limites[12].nparticipar})`
                        embed.fields[12].value = embed.fields[12].value.replace(`<@${dados.d.user_id}>`,"")
                        embed.fields[12].value = embed.fields[12].value.replace("><",">\n<")
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

        if(dados.d.emoji.id === "965331947356291082" && limites[4].prisma < 1) {
            limites[4].prisma = limites[4].prisma +1
            embed.fields[4].name = `Prisma (${limites[4].prisma}/1)`
            embed.fields[4].value = `<@${dados.d.user_id}>\n`
        }

        if(dados.d.emoji.id === "965331731706171402" && limites[5].shadowcaller < 1) {
            limites[5].shadowcaller = limites[5].shadowcaller +1
            embed.fields[5].name = `Shadowcaller (${limites[5].shadowcaller}/1)`
            embed.fields[5].value = `<@${dados.d.user_id}>\n`
        }

        if(dados.d.emoji.id === "965331964867530892" && limites[6].fulgurante < 1) {
            limites[6].fulgurante = limites[6].fulgurante +1
            embed.fields[6].name = `Fulgurante (${limites[6].fulgurante}/1)`
            embed.fields[6].value = `<@${dados.d.user_id}>\n`
        }

        if(dados.d.emoji.id === "965329447337218168" && limites[7].enigmatico < 1) {
            limites[7].enigmatico = limites[7].enigmatico +1
            embed.fields[7].name = `Enigmático (${limites[7].enigmatico}/1)`
            embed.fields[7].value = `<@${dados.d.user_id}>\n`
        }

        if(dados.d.emoji.id === "970026432002658395" && limites[8].dps < 2) {
            limites[8].dps = limites[8].dps +1
            embed.fields[8].name = `DPS (${limites[8].dps}/2)`
            if(limites[8].dps == 1){
                embed.fields[8].value = `<@${dados.d.user_id}>`
            } else{
                embed.fields[8].value = embed.fields[8].value + `\n<@${dados.d.user_id}>`
            }
        }

        if(dados.d.emoji.id === "966801241353093221" && limites[9].scout < 1) {
            limites[9].scout = limites[9].scout +1
            embed.fields[9].name = `Scout (${limites[9].scout}/1)`
            embed.fields[9].value = `<@${dados.d.user_id}>\n`
        }

        if(dados.d.emoji.id === "969804985321812038"){
            limites[11].reserva = limites[11].reserva +1
            embed.fields[11].name = `Reserva (${limites[11].reserva})`
            if(limites[11].reserva == 1){
                embed.fields[11].value = `<@${dados.d.user_id}>`
            } else {
                embed.fields[11].value = embed.fields[11].value + `\n<@${dados.d.user_id}>`
            }
        }

        if(dados.d.emoji.name === "❌"){
            limites[12].nparticipar = limites[12].nparticipar +1
            embed.fields[12].name = `Não vou mais participar (${limites[12].nparticipar})`
            if(limites[12].nparticipar == 1){
                embed.fields[12].value = `<@${dados.d.user_id}>`
            } else {
                embed.fields[12].value = embed.fields[12].value + `\n<@${dados.d.user_id}>`
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

