import { amqplib } from 'amqplib';

const amqpUrl = 'amqp://admin:huynhngocthuat@103.173.255.221:5672';

const connectRabbitMQ = async() => {
    try{
        const connection = await amqplib.connect(amqpUrl);
        const channel = await connection.createChannel();
        const exchangeName = 'synchronous/create_comment'
        const queueName = 'ZnjR4L43FFdIjiN41kDhWyukH6N3UIyn'.concat('|').concat('create_comment');

        await channel.assertExchange(exchangeName, 'direct', {
            durable: false
        });
        const {
            queue
        } = channel.assertQueue(queueName);
        console.log(queue);

        await channel.bindQueue(queueName, exchangeName, '')
        console.log("Hello world")
        await channel.consume(queueName, msg => {
            console.log(`msg::`, msg.content.toString())
        },{
            noAck: true,
        });
    } catch(error){
        console.error(error.message);
    }
    
};

export default connectRabbitMQ;