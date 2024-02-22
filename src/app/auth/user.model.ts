export class User{

    constructor( public id: string, private _token: string, private tokenExpiry: Date){

    }

    public get token(){
        if (!this.tokenExpiry || new Date() > this.tokenExpiry){
            return null;
        } 
        return this._token; 
    }
}