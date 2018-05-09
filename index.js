const Discord = require('discord.js');


var bot = new Discord.Client();
var prefix = ("!");
var randnum = 0;

bot.on('ready', () => {
    bot.user.setPresence({ game: { name: '[ !aide ] FoXyBoT', type: 0}})
    console.log("Bot Ready !");
});

bot.login(process.env.TOKEN);

bot.on('message', message => {
    if (message.content === "Salut" || message.content === "Bonjour" || message.content === "Bonsoir" || message.content === "Bichour" || message.content === "Yo"){
        random();

        if (randnum == 0) {
            message.reply("Yo ! :)")
        }
        if (randnum == 1){
            message.reply("Bien le bonjour ! ;)");
        }
        if (randnum == 2){
            message.reply("Je te salue mon ami ! ;p");
        }
        if (randnum == 3){
            message.reply("Salut ! ;D");
        }
        console.log("Commande : Salut (effectuée) -> Réponse n°" + randnum);
    }

    if (message.content === prefix + "infodiscord"){
        var info_embed = new Discord.RichEmbed()
            .setTitle("Informations du Discord :")
            .addField("Nom du Discord :", message.guild.name)
            .addField("Crée le :", message.guild.createdAt)
            .addField("Tu as rejoins le :", message.member.joinedAt)
            .addField("Utilisateurs sur le Discord :", message.guild.memberCount)
            .addField("Fondateur du Discord :", message.guild.owner)
            .setColor("#CF3800")
        message.channel.send(info_embed);
        console.log("Commande : InfosDiscord (effectuée)")
    }

    if (message.content.startsWith(prefix + "sondage")){
        if(message.author.id == "267392544156024832"){
            let args = message.content.split(" ").slice(1);
            let thingToEcho = args.join(" ")
            var sondage_embed = new Discord.RichEmbed()
                .setTitle("Sondage")
                .addField(thingToEcho, "Répondre avec :white_check_mark: ou :x:")
                .setColor("0xB40404")
                .setTimestamp()
            message.guild.channels.find("name", "sondage").send(sondage_embed)
            .then(function (message){
                message.react("✅")
                message.react("❌")
            }).catch(function(){
            });
        } else {
            return message.reply("Tu n'as pas la permission !")
        }
    }

    if (message.content === prefix + "aide"){
        var help_embed = new Discord.RichEmbed()
            .setColor('#046380')
            .setTitle("Commandes du FoXyBoT :")
            .addField("- !aide","Afficher les commandes du bot.")
            .addField("- !infodiscord","Obtenir les informations sur le Discord.")
            .addField("- !sondage","Créer un sondage (Commande OWNER & ADMIN !).")
            .setFooter("©FoxyFaiD | 2018 - 2019 | All Right Reserved")
        message.channel.send(help_embed);
        console.log("Commande : Help (effectuée)");
    }
});

bot.on("guildMemberAdd", member => {
    member.send(`Salut à toi, ${member} ! 
        \n Je te souhaite la bienvenue sur le Discord Officiel de FoXyFaiD, ton YouTubeur préféré.
        \n :warning: Mais attention ! :warning:
        \n Il faut respecter certaines règles qui se situent dans le salon #reglement, dont je t'invite à lire fortement.
        \n Si tu as des questions, n'hésite pas à contacter les modérateurs. Ils sont là pour t'aider.
        \n J'espère que tu passera un agréable moment ;p
        \n Cordialement, ${member.guild.owner}`)

    member.send("**Quelques règles de bonne conduites :**")
    member.send("```[>](1) Soyez respectueux. \n[>](2) Ne soyez pas hors-sujet et prennez en compte ce que les gens disent avant de débarquer avec un hors-sujet total. \n[>](3) Ne soyez pas haineux. On est ici pour passer un bon moment. Twitter est un meilleur endroit pour raconter comment vous détestez le monde. \n[>](4) Le piratage c'est pas très bien. Donc n'en parlez pas. \n[>](5) On ne tolère aucun écart de comportement envers les femmes, les filles et les e-girls.```")
    
    member.send(" \n \n **Ce qui est interdit :**")
    member.send("```[>](1) Spam des entrées/sorties des chans vocaux. \n[>](2) Ping Modérateurs et utilisation de .report abusifs (sans raison) \n[>](3) Tout ce qui est nsfw ou images non approprié pour les plus jeunes. \n[>](4) Le spam et autres pollutions de chan, autre que dans #spam \n[>](5) L'utilisation de commandes de bots autre que dans #bots à des fins inutiles. \n[>](6) Les insultes gratuites et le harcélement envers d'autres membres de la communauté. \n[>](7) Les noms insultants. \n[>](8) Les spoils de séries, jeux, films et autres produits culturels. \n[>](9) Interdiction aux pubs pour d'autres Discord personels. (Les liens vers des Discord d'utilité publique comme r/Overwatch ou Discord API sont autorisés) \n[>](10) L'esquive de sanction (via sortie et entrée du Discord). \n[>](11) Le multi-compte proxy de ban. \n[>](12) L'usurpation d'identité. \n[>](13) La publicité pour des sites, des chaînes YouTubes personnelles, des serveurs Minecraft personnels,...```")

    member.send(" \n __L'équipe de modération se réserve le droit de rajouter des règles à tout moment.__")

    member.guild.channels.find("name", "bienvenue").send(`Bienvenue ${member} sur le FoXyDiscord !`)
})

bot.on("guildMemberAdd", member => {
    var role = member.guild.roles.find("name", "Membre");
    member.addRole(role)
})

function random(min, max){
    min = Math.ceil(0);
    max = Math.floor(3);
    randnum = Math.floor(Math.random() * (max - min + 1) + min);
}
