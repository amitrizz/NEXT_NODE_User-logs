import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'gps-tracker',
    brokers: ['localhost:9092'] // Replace with your Kafka broker address
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'gps-logs-group' });

const connectProducer = async () => {
    await producer.connect();
};

const connectConsumer = async () => {
    await consumer.connect();
};

export { kafka, producer, consumer, connectProducer, connectConsumer };
