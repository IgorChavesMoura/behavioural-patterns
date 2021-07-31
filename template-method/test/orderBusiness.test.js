import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import Order from '../src/entities/order.js';
import BaseBusiness from '../src/business/base/BaseBusiness.js';
import OrderBusiness from '../src/business/OrderBusiness.js';
import { NotImplementedException } from '../src/util/exceptions.js';

describe('Test suite for Template Method design pattern', () => {

    beforeEach(() => {

        jest.restoreAllMocks();

    });

    describe('#OrderBusiness', () => {

        test('execution Order Business without Template Method', () => {

            const order = new Order({

                customerId: 1,
                amount: 100000,
                products: [{ description: 'ferrari' }]

            });

            const orderBusiness = new OrderBusiness();

            // All devs should remember to follow this execution flow
            const isValid = orderBusiness._validateRequiredFields(order);
            expect(isValid).toBeTruthy();

            const result = orderBusiness._create(order);
            expect(result).toBeTruthy();



        });

        test('execution Order Business with Template Method', () => {

            
            const order = new Order({

                customerId: 1,
                amount: 100000,
                products: [{ description: 'ferrari' }]

            });

            const orderBusiness = new OrderBusiness();

            const calledValidationFn = jest.spyOn(orderBusiness, orderBusiness._validateRequiredFields.name);
            const calledCreateFn = jest.spyOn(orderBusiness, orderBusiness._create.name);

            // With Template Method, the execution flow is always executed
            const result = orderBusiness.create(order);
            expect(result).toBeTruthy();
            expect(calledValidationFn).toHaveBeenCalled();
            expect(calledCreateFn).toHaveBeenCalled();

        });

    });

});