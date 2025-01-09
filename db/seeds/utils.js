function generateRandomData(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

module.exports = {
    generateRandomData,
    formatDate,
};