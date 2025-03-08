
class CustomError extends Error{
    statusCode: number;
    status: string;

    constructor(message :string,statusCode:number){
        super(message);
        this.name = 'CustomError';
        Object.setPrototypeOf(this, new.target.prototype);
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";


    }
}

export default CustomError;
