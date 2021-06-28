const { MESSAGES } = require('../../utility/constants');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports.run = (bot, message, args) => {
    var countries = args[0];

    if(!args[0]) {
        fetch('https://covid19.mathdro.id/api')
        .then(response => response.json())
        .then(data => {
            const confirmed = data.confirmed.value.toLocaleString()
            const recovered = data.recovered.value.toLocaleString()
            const deaths = data.deaths.value.toLocaleString()
            const dailySummary = data.dailySummary
            const image = data.image
            const countries = data.countries
            const lastUpdate = data.lastUpdate

            const embed = new MessageEmbed()
            .setTitle("Informations COVID-19 dans le monde")
            .setThumbnail(image)
            .addFields(
                { name: 'Cas totaux', value: `${confirmed}`, inline: true},
                { name: 'Cas soignés', value: `${recovered}`, inline: true},
                { name: 'Décès totaux', value: `${deaths}`, inline: true},
                { name: 'Résumé du jour', value: `${dailySummary}`, inline: true},
                { name: 'Pays', value: `${countries}`, inline: true},
                { name: 'Dernière mise à jour', value: `${lastUpdate}`, inline: true},
            )

            message.channel.send(embed)
        })
    } else {
        fetch(`https://covid19.mathdro.id/api/countries/${args[0]}`)
        .then(response => response.json())
        .then(data => {
          
            const detail = data.confirmed.detail.toLocaleString()
            const confirmed = data.confirmed.value.toLocaleString()
            const recovered = data.recovered.value.toLocaleString()
            const deaths = data.deaths.value.toLocaleString()
            const lastUpdate = data.lastUpdate

            const embed = new MessageEmbed()
            .setTitle(`Informations COVID-19 dans le pays ${args[0]}`)
            .addFields(
                { name: 'Cas totaux', value: `${confirmed}`, inline: true},
                { name: 'Cas soignés', value: `${recovered}`, inline: true},
                { name: 'Décès totaux', value: `${deaths}`, inline: true},
                { name: 'Dernière mise à jour', value: `${lastUpdate}`, inline: true},
                { name: 'Détail', value: `${detail}`, inline: true}
            )

            message.channel.send(embed)
            
        }).catch(e => {
            return message.channel.send('Pays invalide')
        });        
    };
};
