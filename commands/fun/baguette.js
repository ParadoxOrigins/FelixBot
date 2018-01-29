class Baguette {
    constructor() {
        this.help = {
            name: 'baguette',
            description: 'A baguette is a long, thin loaf of French bread that is commonly made from basic lean dough. It is distinguishable by its length and crisp crust.',
            usage: 'baguette'
        }
    }

    run(client, message, args) {
        return new Promise(async(resolve, reject) => {
            try {
                resolve(await message.channel.createMessage(":french_bread:"));
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = new Baguette();
