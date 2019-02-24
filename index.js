const Discord = require('discord.js');
const { prefix, token } = require( './config.json' );
const axios = require('axios');
const client = new Discord.Client();

/**
 * When the client is ready, run this code.
 */
client.once( 'ready', () => {
    console.log( 'Ready!' );
} );

/**
 * Trigger the message function for the bot
 */
client.on( 'message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if ( command === "pony" ) {
        if ( !args.length ) {
            axios.get( 'https://derpibooru.org/search.json', {
                params: {
                    q: '*',
                }
            } )
            .then( res => {
                const pages = Math.floor( res.data.total / 15 );
                const randomPage = Math.floor( Math.random() * pages );
                axios.get( `https://derpibooru.org/search/index.json`, {
                    params: {
                        q: '*',
                        page: randomPage
                    }
                } )
                .then( res => {
                    const randomIndex = Math.floor( Math.random() * res.data.search.length );
                    const randomImage = res.data.search[randomIndex];
                    message.channel.send(`https:${randomImage.image}`);
                } )
                .catch( error => {
                    console.log( error );
                } )
            } )
            .catch( error => {
                console.log( error );
            } );
        } else {
            const concatArgs = args.join(' ');
            axios.get( 'https://derpibooru.org/search.json', {
                params: {
                    q: concatArgs,
                }
            } )
            .then( res => {
                const pages = Math.floor( res.data.total / 15 );
                const randomPage = Math.floor( Math.random() * pages );
                axios.get( `https://derpibooru.org/search/index.json`, {
                    params: {
                        q: concatArgs,
                        page: randomPage
                    }
                } )
                .then( res => {
                    const randomIndex = Math.floor( Math.random() * res.data.search.length );
                    const randomImage = res.data.search[randomIndex];
                    message.channel.send(`https:${randomImage.image}`);
                } )
                .catch( error => {
                    console.log( error );
                } )
            } )
            .catch( error => {
                console.log( error );
            } );
        }
    }
} );

/**
 * Login to Discord with app's token.
 */
client.login( token );