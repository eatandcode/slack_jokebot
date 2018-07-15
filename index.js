const SlackBot = require('slackbots');
const axios = require('axios');
const bot = new SlackBot({
    token: 'xoxb-395870390565-396959188774-M7Td3MqLnsErcED78yf9RnP0',
    name: 'jokebot'
});

//start handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':smiley:'
    };

    bot.postMessageToChannel(
        'general', 
        'Get Ready To Laugh With @Jokebot!', 
        params
    );  
});

//error handler
bot.on('error', err => console.log(err));

//message handler
bot.on('message', data => {
    if(data.type != 'message'){
        return;
    }
    //console.log(data);
    handleMessage(data.text);
});

//response to data
function handleMessage(message){
    if(message.includes(' chuck norris')){
        chuckJoke();
    } else if(message.includes(' yo mama')){
        yoMamaJoke();
    } else if(message.includes(' random')){
        randomJoke();
    } else if(message.includes(' help')){
        runHelp();
    } else if(message.includes(' thanos')){
        runThanosJoke();
    }
}
//tell a Chuck Norris Joke
function chuckJoke(){
    axios.get('http://api.icndb.com/jokes/random').then(res => {
            const joke = res.data.value.joke;

            const params = {
                icon_emoji: ':laughing:'
            };
        
            bot.postMessageToChannel('general', `Chuck Norris: ${joke}`,
            params
            );
        })
}

//tell a Yo Mama Joke
function yoMamaJoke(){
    axios.get('http://api.yomomma.info').then(res => {
            const joke = res.data.joke;

            const params = {
                icon_emoji: ':laughing:'
            };
        
            bot.postMessageToChannel('general', `Yo Mama: ${joke}`,
            params
            );
        })
}
//tell random joke
function randomJoke(){
    const rand = Math.floor(Math.random() * 2) + 1;
    if (rand === 1){
        chuckJoke();
    }else if (rand === 2) {
        yoMamaJoke();
    }
}

//show help text
function runHelp(){
    const params = {
        icon_emoji: ':question:'
    };

    bot.postMessageToChannel('general', `Type @jokebot with either 
    'chuck norris', 'yo mamma', or 'random' to get a joke`, params);
}

//Thanos jokes
function runThanosJoke(){
    const params = {
        icon_emoji: ':laughing:'
    };

    bot.postMessageToChannel('general', `Yo momma so fat Thanos had to snap twice`, params);
}