import ContextStrategy from "./base/contextStrategy.js";
import MongoDBStrategy from "./strategies/mongoDbStrategy.js";
import PostgresStrategy from "./strategies/postgresStrategy.js";

const postgresConnectionString = 'postgres://igormoura:12345@localhost:8888/heroes';

const postgresContext = new ContextStrategy(new PostgresStrategy(postgresConnectionString));
await postgresContext.connect();

const mongoDBConnectionString = 'mongodb://igormoura:12345@localhost:27017/heroes';

const mongoDBContext = new ContextStrategy(new MongoDBStrategy(mongoDBConnectionString));
await mongoDBContext.connect();


const data = [
    {
        name: 'igormoura',
        type: 'transaction'
    },
    {
        name: 'mariasilva',
        type: 'activitylog'
    }
];

const contextTypes = {

    transaction: postgresContext,
    activitylog: mongoDBContext

};

for(const { name, type } of data) {

    const context = contextTypes[type];

    await context.create({ name: `${name} ${Date.now()}`  });

    console.log(type, context.dbStrategy.constructor.name);
    console.log(await context.read());

}

// // await postgresContext.create({ name: data[0].name });

// // console.log(await postgresContext.read());

// await mongoDBContext.create({ name: data[1].name });

// console.log(await mongoDBContext.read());


