class Bus{
    constructor(busPlates, busSeats, busRoute,busDriver){
        this.busPlates=busPlates;
        this.busSeats=busSeats;
        this.busRoute=busRoute;
        this.busDriver=busDriver;
        this.currentPassengers=0;
    }
    addPassengers(num){
        if(this.currentPassengers + num <= this.busSeats){
            this.currentPassengers +=num;
            return `${num} passengers added. ${this.currentPassengers} passengers aboard`;
        }else{
            return `there is no room for more passengers`;
        }
    }
    removePassengers(num){
        if (this.currentPassengers -num >=0){
            this.currentPassengers -=num;
            return `${num} passengers alighted. ${this.currentPassengers} passengers remaining`
        }
    }

    getBus(){
        return `Bus number plates :${this.busPlates}`
        return `Bus driver :${this.busDriver}`
    }
}

modules.export=Bus;