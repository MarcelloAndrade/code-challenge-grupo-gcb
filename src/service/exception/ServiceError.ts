class ServiceError {
    statusCode: number
    message: string
    log: string
    
    constructor(statusCode: number, message: string, log: string) {
        this.statusCode = statusCode;        
        this.message = message;      
        this.log = log
    }    
}

export { ServiceError };