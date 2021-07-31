import { NotImplementedException } from "../../util/exceptions.js";

NotImplementedException

export default class BaseBusiness {

    _validateRequiredFields(data) {

        throw new NotImplementedException(this._validateRequiredFields.name);

    }

    _create(data) {

        throw new NotImplementedException(this._create.name);

    }

    /*
        Martin Fowler's pattern,
        the pattern's purpose is to ensure a method flow, with a defined sequence to run

        create is Template Method's efective implementation
    */
    create(data) {
        // validate fields
        // persist on DB
        const isValid = this._validateRequiredFields(data);

        if(!isValid) {

            throw new Error("Invalid data!");

        }

        return this._create(data);

    }

}