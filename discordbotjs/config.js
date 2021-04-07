const discord = require('discord.js');
const s = require('./setup.json');
const client = new discord.Client();
client.on('ready', () =>{
    console.log(`${client.user.tag} is up and running!`)
    console.log(`Prefix = ${s.prefix}`)
    client.user.setActivity(`${s.activity}`,{type:"PLAYING"})
})
client.on('message', cmd =>{
    if(cmd.content === `${s.prefix}dice`){
        const numbers = [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
        ]
        const number = numbers[Math.floor(Math.random() * numbers.length)]
        cmd.reply(`you got ${number}`);
    }
})
//utils
client.on('message', cmd =>{
    if(cmd.content.startsWith(`${s.prefix}ban`)){
        cmd.delete();
        if(cmd.member.hasPermission("BAN_MEMBERS")){
            const mentioned = cmd.mentions.users.first();
            if(mentioned){
                const member = cmd.guild.members.resolve(mentioned);
                if(member){
                    member.ban();
                }
            }
        }else{
            cmd.author.send(`You do not have perms to do that.`);
        }
    }
})
client.on('message', cmd =>{
    if(cmd.content.startsWith(`${s.prefix}kick`)){
        cmd.delete();
        if(cmd.member.hasPermission("KICK_MEMBERS")){
            const mentioned = cmd.mentions.users.first();
            if(mentioned){
                const member = cmd.guild.members.resolve(mentioned);
                if(member){
                    member.kick();
                }
            }
        }else{
            cmd.author.send(`You do not have perms to do that.`);
        }
    }
})
client.login(s.token);