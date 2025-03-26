import ROSLIB from "roslib";

export class RosService {
    private ros: ROSLIB.Ros;

    constructor(ip: string, port: number) {
        let url = `ws://${ip}:${port}`
        this.ros = new ROSLIB.Ros({ url });
    }

    createPublisher(topicName: string, messageType: string): ROSLIB.Topic {
        return new ROSLIB.Topic({
            ros: this.ros,
            name: topicName,
            messageType: messageType,
        });
    }

    createSubscriber(
        topicName: string,
        messageType: string,
        callback: (message: any) => void
    ): ROSLIB.Topic {
        const topic = new ROSLIB.Topic({
            ros: this.ros,
            name: topicName,
            messageType: messageType,
        });
        topic.subscribe(callback);
        return topic;
    }

    disconnect() {
        this.ros.close();
    }
}