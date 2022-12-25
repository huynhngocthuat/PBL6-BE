import * as amqplib from 'amqplib';
import { UserResponse } from 'commons/responses/auth';
import dotenv from 'dotenv';
import {
  VideoCommentsService,
  EmotionReactsService,
  SubscribesService,
} from 'services';

dotenv.config();

const amqpUrl = process.env.RABBITMQ_HOST;
export async function connectRabbitMQ() {
  try {
    const connection = await amqplib.connect(amqpUrl);
    const channel = await connection.createChannel();
    const exchangeName = 'synchronous/database';
    await channel.assertExchange(exchangeName, 'direct', {
      durable: false,
    });

    await channel.consume(
      'create_comment',
      (data) => {
        const obj = JSON.parse(data.content.toString());
        console.log(data.content.toString());
        VideoCommentsService.create(obj);
      },
      {
        noAck: true,
      }
    );

    await channel.consume(
      'create_emotion',
      (data) => {
        const obj = JSON.parse(
          data.content.toString().replace('like', 'isLike')
        );
        console.log(data.content.toString().replace('like', 'isLike'));
        EmotionReactsService.create(obj);
      },
      {
        noAck: true,
      }
    );

    await channel.consume(
      'update_emotion',
      (data) => {
        const obj = JSON.parse(
          data.content.toString().replace('like', 'isLike')
        );
        console.log(data.content.toString().replace('like', 'isLike'));
        EmotionReactsService.update(obj.id, obj);
      },
      {
        noAck: true,
      }
    );

    await channel.consume(
      'create_subscribe',
      (data) => {
        const obj = JSON.parse(data.content.toString());
        console.log(data.content.toString());
        SubscribesService.create(obj);
      },
      {
        noAck: true,
      }
    );
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

export async function sendDataToRabbitMQ(routingKey, data) {
  try {
    const connection = await amqplib.connect(amqpUrl);
    const channel = await connection.createChannel();
    const exchangeName = 'synchronous/database';

    await channel.assertExchange(exchangeName, 'direct', {
      durable: false,
    });
    const result = new UserResponse(data);
    console.log(JSON.stringify(result));
    await channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(result))
    );
    // setTimeout(() => {
    //   connection.close();
    //   process.exit(0);
    // }, 0);
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}
