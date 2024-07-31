class Route{
    constructor(name, destination, morningHrs, afternoonHrs){
        this.name=name;
        this.destination=destination;
        this.morningHrs=morningHrs;
        this.afternoonHrs=afternoonHrs;
    } 

    getRouteInfo(){
        return `Route: ${this.name}, Destination: ${this.destination}, fare: ${this.fare}`;
    }
    
    getFare(){
        const currentHour=new Date().getHours();
        if (currentHour>=8 && currentHour <=12){
            return this.morningHrs;
        }else{
            return this.afternoonHrs;
        }
    }
}
module.exports=Route;