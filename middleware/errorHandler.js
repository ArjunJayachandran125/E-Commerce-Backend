export const notFound = (req,res,next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue);
        return res.status(400).json({
        message: `Duplicate value for field: ${field}`,
        });
    }
    res.status(statusCode).json({
        message: err.message,
    });
};