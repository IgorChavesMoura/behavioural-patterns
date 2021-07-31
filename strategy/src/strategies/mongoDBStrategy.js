import MongoDB from 'mongodb';

export default class MongoDBStrategy {

    #dbInstance;

    constructor(connectionString) {

        const { pathname: dbName } = new URL(connectionString);

        this.connectionString = connectionString.replace(dbName, '');

        this.db = dbName.replace(/\W/, '');
        this.collection = 'warriors';
    
    }

    async connect() {

        
        const client = new MongoDB.MongoClient(this.connectionString, {

            useUnifiedTopology: true

        });

        await client.connect();

        this.#dbInstance = client.db(this.db).collection(this.collection);


    }

    async create(item) {

        return this.#dbInstance.insertOne(item);

    }

    async read(item) {

        return this.#dbInstance.find(item).toArray();

    }


}