// eslint-disable-next-line import/prefer-default-export
export function generateQueueSynchronous(length, functionSync) {
    try {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i += 1 ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        result = result.concat('|').concat(functionSync);
        return result;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    };
}