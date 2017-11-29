module.exports = {
    //An array of trustable peoples IDs, put yours as well since in most case this is checked rather than the ownerID
    admins: ["TRUSTABLE_PEOPLE_ID_1", "TRUSTABLE_PEOPLE_ID_2", "WHY_NOT_A_THIRD"],
    //The default prefix, this will be one by default on each new server and in dm
    prefix: "uwu.",
    //Your ID
    ownerID: "YOUR_ID",
    //API key for different bot lists, in a selfhost case, leave that false
    discordBotList: false,
    discordBotFr: false,
    terminalBotList: false,
    //API key for weeb.sh, in a selfhost case you won't be able to get one and therefore most of the image commands will be disabled
    wolkeImageKey: false,
    //Mashape marketplace API key
    mashapeKey: false,
    //Account credentials on MyAnimeList, this will be used for anime commands
    malCredentials: {
        name: "USERNAME",
        password: "PASSWORD"
    },
    //RapidAPI API key
    rapidApiKey: false,
    //Steam API key
    steamApiKey: false,
    //Whatanime.ga API key (still not implemented)
    whatAnimeKey: false,
    //Actually needed: The token of the bot, won't work without it
    token: "TOKEN"
}