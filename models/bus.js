class Bus {
    constructor(busPlates, busSeats, busRoute, busDriver=null) {
        this.busPlates = busPlates;
        this.busSeats = busSeats;
        this.busRoute = busRoute;
        this.busDriver = busDriver;
        this.currentPassengers = 0;
    }

    addPassengers(num) {
        if (this.currentPassengers + num <= this.busSeats) {
            this.currentPassengers += num;
            return `${num} passengers added. ${this.currentPassengers} passengers aboard.`;
        } else {
            return `There is no room for more passengers.`;
        }
    }

    removePassengers(num) {
        if (this.currentPassengers - num >= 0) {
            this.currentPassengers -= num;
            return `${num} passengers alighted. ${this.currentPassengers} passengers remaining.`;
        } else {
            return `Cannot remove ${num} passengers. Only ${this.currentPassengers} passengers aboard.`;
        }
    }

    getBus() {
        return `Bus number plates: ${this.busPlates}, Bus driver: ${this.busDriver}, Route: ${this.busRoute}`;
    }
}

module.exports = Bus;
