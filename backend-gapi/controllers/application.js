const status = (parent, args, context, info) => {
    const { start } = args;
            
    const requestTime = dayjs(start);
    const currentTime = dayjs();
    const warp = currentTime.diff(requestTime, 'millisecond');
            
    return {
        status: 'ok',
        wakeup: {
            warp,
            request: requestTime.toISOString(),
            response: currentTime.toISOString()
        }
    }
}

module.exports = {
    status,
}