const amqplib = require('amqplib');
const {EXCHANGE_NAME,MESSAGE_BROKER_URL}=require('../config/serverConfig');

const createChannel = async () => {
    try {
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);// connection setup to RabbitMq server
        const channel = await connection.createChannel();// channel created to communicate from the nodejs server to thr message broker(rabbitmq)
        await channel.assertExchange(EXCHANGE_NAME, 'direct', false); // distributor setup
        return channel;
    } catch (error) {
        throw error;
    }
}

const subscribeMessage = async (channel, service, binding_key) => { // binding_key is used to refer to a particular queue as there can be multiple queues

    try {
        const applicationQueue = await channel.assertQueue('REMINDER_QUEUE');

        channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

        channel.consume(applicationQueue.queue, msg => {
            console.log('received data');
            console.log(msg.content.toString());
            channel.ack(msg);// acknowledge means that a paricular message has been consumed by the corresponding subscriber
        })
    } catch (error) {
        throw error;
    }

}

const publishMessage = async (channel, binding_key, message) => {
    try {
        await channel.assertQueue('REMINDER_QUEUE');
        await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(message));
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createChannel,
    subscribeMessage,
    publishMessage
}