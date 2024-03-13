export class Nav {
    name:string = "";
    url:string = "";
    isActive:Boolean = false;


    constructor(name:string, url:string){
        this.name = name;
        this.url = url;
        this.isActive = false;
    }
}