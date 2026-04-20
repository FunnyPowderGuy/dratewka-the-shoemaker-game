export class Player {
    constructor() {
        this.carrying = null;
    }

    isCarrying() {
        return this.carrying !== null;
    }

    pickUp(item) {
        if (this.isCarrying()) return false;
        this.carrying = item;
        return true;
    }

    drop() {
        const item = this.carrying;
        this.carrying = null;
        return item;
    }
}
