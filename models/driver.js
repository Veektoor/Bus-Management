class Driver{
    constructor(driverID, driverName, busNumber=null, licenseNumber, dateHired,workingHours=0 ){
        this.driverID=driverID;
        this.driverName=driverName;
        this.busNumber=busNumber;
        this.licenseNumber=licenseNumber;
        this.dateHired=dateHired;
        this.workingHours=workingHours;
    }
    assignBus(bus){
        this.busNumber=bus;
        return `driver ${this.driverName} has been assigned to ${bus.busNumber}`;
    }
    unassignBus(){
        this.busNumber=null;
        return `driver ${this.driverName} has been unassigned from bus`;
    }
    getDriver(){
        return `Driver ID: ${this.driverID}, Driver Name: ${this.driverName}, License Number : ${this.licenseNumber} and Bus Number :${this.busNumber}`;
    }
    activeHours(num){
        if(num>9){
            return `Invalid input`;
        }else if (num>0){
            this.workingHours += num;
            return `working hours: ${this.workingHours}`;
        }else{
            return `The driver did not work today.`
        }
    }
}
modules.export(Driver);