import request from 'request';
import ip from 'ip';
import logger from 'configs/winston.config';

const eurekaService = `http://localhost:8761/eureka`;
const registerWithEureka = (appName, port) => {
    request.post({
        headers: { 'content-type': 'application/json' },
        url: `${eurekaService}/apps/${appName}`,
        body: JSON.stringify({
            instance: {
                hostName: `localhost`,
                instanceId: `${appName}-${port}`,
                vipAddress: `${appName}`,
                app: `${appName.toUpperCase()}`,
                ipAddr: ip.address(),
                status: `UP`,
                port: {
                    $: port,
                    "@enabled": true
                },
                dataCenterInfo: {
                    "@class": `com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo`,
                    name: `MyOwn`
                }
            }
        })
    },
        (error, response, body) => {
            if (!error) {
                logger.info(`${body}`)
                setInterval(() => {
                    request.put({
                        headers: { 'content-type': 'application/json' },
                        url: `${eurekaService}/apps/${appName}/${appName}-${port}`
                    // eslint-disable-next-line no-shadow
                    }, (error, response, body => {
                        if (error) {
                            logger.info(`${body}`);
                            logger.info('Sending heartbeat to Eureka failed.');
                        }
                    }));
                }, 50 * 1000);

            } else {
                logger.info(`Not registered with eureka due to: ${error}`);
            }
        });
}

export default registerWithEureka

