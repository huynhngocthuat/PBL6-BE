import * as amqplib from 'amqplib';
import dotenv from 'dotenv';
import { generateQueueSynchronous } from 'helpers/commonFunctions';
import { VideoCommentsController } from 'controllers';

dotenv.config();

const amqpUrl = process.env.RABBITMQ_HOST;

const connectRabbitMQ = async() => {
    try{
        const connection = await amqplib.connect(amqpUrl);
        const channel = await connection.createChannel();
        const exchangeName = 'synchronous/create_comment'
        const queueName = generateQueueSynchronous(32, 'create_comment');
        await channel.assertExchange(exchangeName, 'direct', {
            durable: false
        });
        const {
            // eslint-disable-next-line no-unused-vars
            queue
        } = channel.assertQueue(queueName);
        await channel.bindQueue(queueName, exchangeName, 'create_comment')
        await channel.consume(queueName, data => {
            console.log(data.content.toString());
            VideoCommentsController.create(data.content.toString());
        },{
            noAck: true,
        });
    } catch(error){
        throw new Error(JSON.stringify(error));
    }
    
};

export default connectRabbitMQ;