import { Response } from "express";

const ERROR_NAME = "ServiceException";

class ServiceException extends Error {

    statusCode: number
    messageLog: string
    
    constructor(statusCode: number, message: string, messageLog: string) {
        super(message);
        this.name = ERROR_NAME;
        this.statusCode = statusCode;        
        this.messageLog = messageLog
    }    
}

const getResponseError = (response: Response, error:ServiceException) => {
    if (error.name == ERROR_NAME) {
        console.log(">", error.messageLog, "status code:", error.statusCode, "message:", error.message)
        return response.status(error.statusCode).json({message: error.message});    
    } else {
        console.log(error)
        return response.status(500).json({message: "Internal Server Error"});    
    }
} 

export { ServiceException, getResponseError }