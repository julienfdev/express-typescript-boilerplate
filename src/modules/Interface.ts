export class ApiResponse{
    response: string;
    data: any;
    error: ErrorConstructor | undefined;
    constructor(response : string, data?: Record<string, any>, error? : ErrorConstructor){
        this.response = response;
        this.data = data;
    }
}

export default ApiResponse;




//ou creer classe
