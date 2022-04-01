export class ApiResponse{
    response: string;
    data: any;
    error: any;
    constructor(response : string, data?: Record<string, any>, error? : Record<string, any>){
        this.response = response;
        this.data = data;
    }
}

export default ApiResponse;




//ou creer classe
