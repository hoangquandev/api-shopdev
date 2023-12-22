const sendResponse = (res, statusCode, message, data = null) => {
    res.status(statusCode).json({
        message: message,
        data: data,
    });
};

module.exports = { sendResponse }