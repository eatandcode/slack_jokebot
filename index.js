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
    if(message.includes(' chucknorris')){
        chuckJoke();
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