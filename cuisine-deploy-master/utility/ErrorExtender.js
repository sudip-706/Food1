class ErrorExtender extends Error{
    constructor(message, statusCode){
        super(message);

        this.statusCode = statusCode;
        statusCode = ""+statusCode;
        this.status = `${statusCode.startsWith('4')?"Client error":"server error"}`;
        // error operational
        this.isOperational = true;
    }
}
module.exports = ErrorExtender;