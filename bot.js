const { ActivityHandler } = require('botbuilder');
const axios = require('axios');

class RestaurantBot extends ActivityHandler {
    constructor() {
        super();
        this.onMessage(async (context, next) => {
            const text = context.activity.text.trim();

            try {
                if (text.startsWith('search')) {
                    const query = text.replace('search', '').trim();
                    const response = await axios.get(`http://localhost:3978/restaurants/search`, {
                        params: { keyword: query }
                    });
                    await context.sendActivity(`Found ${response.data.length} restaurants: ${response.data.map(r => r.name).join(', ')}`);
                } else if (text.startsWith('menu')) {
                    const restaurantName = text.replace('menu', '').trim();
                    const response = await axios.get(`http://localhost:3978/restaurants/${restaurantName}/menu`);
                    await context.sendActivity(`Menu: ${response.data.map(item => item.name).join(', ')}`);
                } else if (text.startsWith('reserve')) {
                    const [restaurantName, date, time, ...specialRequests] = text.replace('reserve', '').trim().split(' ');
                    const response = await axios.post('http://localhost:3978/reservations', {
                        userId: context.activity.from.id,
                        restaurantName,
                        date,
                        time,
                        specialRequests: specialRequests.join(' ')
                    });
                    await context.sendActivity(`Reservation confirmed: ${response.data._id}`);
                } else if (text.startsWith('my reservations')) {
                    const response = await axios.get(`http://localhost:3978/reservations`, {
                        params: { userId: context.activity.from.id }
                    });
                    await context.sendActivity(`Your reservations: ${response.data.map(r => `${r.restaurantId} on ${r.date}`).join(', ')}`);
                } else {
                    await context.sendActivity(`You said: ${text}`);
                }
            } catch (error) {
                console.error('Error handling message:', error);
                await context.sendActivity('An error occurred while processing your request.');
            }

            await next();
        });
    }
}

module.exports.RestaurantBot = RestaurantBot;
