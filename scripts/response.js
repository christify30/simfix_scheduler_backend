class Response {
    constructor(payload){
        const { res, code, message, data, error } = payload;
        this.res = res;
        this.code = code;
        this.message = message;
        this.data = data;
        this.error = error;
    }

    errorResponse() {
        return this.res.
                status(this.code)
                .json({ 
                    message: this.message,
                    errors: this.error
                });
    }

    successResponse() {
        return this.res
               .status(this.code)
               .json({ 
                    message: this.message,
                    data: this.data 
                });
    }
}

function success(payload) {
    const response = new Response({...payload, code:200})
    return response.successResponse();
}

function error(payload) {
    const response = new Response({...payload, code:401, message:"An error occured"});
    return response.errorResponse();
}
module.exports = {
    success,
    error
};