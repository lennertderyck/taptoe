export const formatLink = (url) => {
    const link = new URL(url);
    return link.host
}