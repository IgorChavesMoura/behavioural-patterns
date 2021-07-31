import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import BaseBusiness from '../src/business/base/BaseBusiness.js';
import { NotImplementedException } from '../src/util/exceptions.js';



describe("#baseBusiness", () => {

    beforeEach(() => {

        jest.restoreAllMocks();

    });
    	
    test('Should throw an error when child class doesnt implement _validateRequiredFields', () => {

        class ConcreteClass extends BaseBusiness { }

        const concreteClass = new ConcreteClass();

        const validationError = new NotImplementedException(concreteClass._validateRequiredFields.name);

        expect(() => concreteClass.create({ })).toThrow(validationError);

    });

    test('Should throw an error when child class doesnt implement _create', () => {

        class ConcreteClass extends BaseBusiness {

            _validateRequiredFields = jest.fn().mockReturnValue(true);

        }

        const concreteClass = new ConcreteClass();

        const validationError = new NotImplementedException(concreteClass._create.name);

        expect(() => concreteClass.create({ })).toThrow(validationError);


    });

    test('Should throw an error when _validateRequiredFields returns false', () => {

        
        const VALIDATION_DIDNT_SUCCEED = false;

        class ConcreteClass extends BaseBusiness {

            _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_DIDNT_SUCCEED);
            
        }

        const concreteClass = new ConcreteClass();

        const validationError = new Error('Invalid data!');

        
        expect(() => concreteClass.create({ })).toThrow(validationError);
        
    });

    test('Should call _validateRequiredFields and _create on create', () => {


        class ConcreteClass extends BaseBusiness {

            _validateRequiredFields = jest.fn().mockReturnValue(true);
            _create = jest.fn().mockReturnValue(true);
            
        }

        
        const concreteClass = new ConcreteClass();

        // Ensures that 'BaseBusiness' create method was called, and not a child class create
        const createBaseClassFn = jest.spyOn(BaseBusiness.prototype, BaseBusiness.prototype.create.name);

        const result = concreteClass.create({ });

        expect(result).toBeTruthy();
        expect(createBaseClassFn).toHaveBeenCalled();
        expect(concreteClass._validateRequiredFields).toHaveBeenCalled();
        expect(concreteClass._create).toHaveBeenCalled();

        

    });

});
