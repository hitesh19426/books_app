// initializing the server here.
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.ATLAS_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        console.log("Successfully connected to the client");

        // await findMovie("The Avengers");
        // await findAllMovie(client);
        // await addNewRecord(client);
        // await addManyNewBooks(client);
        // await updateARecord(client);
        // await deleteOne();
        // await countDocuments();
        // await countDistinct();
    }catch(err){
        console.error("Error connecting to MongoDB", err);
    }finally{
        await client.close();
    }
}

module.exports = run;