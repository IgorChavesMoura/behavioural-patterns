export class NotImplementedException extends Error {

    constructor(msg) {

        super(`${msg} was called without and implmentation`);

        this.name = "NotImplementedException";

    }

}
