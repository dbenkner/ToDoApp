export class NewToDoDto {
    name:string = "";
    description?:string;
    priority:number = 1;
    dateStarted: Date|any;
    userId:number = 0;
}