async function findMovie(name) {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    const query = {
        title: name,
    }
    const options = {
        sort:{"imdb.rating": -1},
        projection: {_id: 0, title: 1, imdb: 1},
    }

    const movie = await movies.findOne(query, options);
    console.log(movie);
}

async function findAllMovie() {
    try{
        const database = client.db('sample_mflix');
        const movies = database.collection('movies');

        const query = {runtime: {$gt : 600}};
        const options = {
            sort: {title: 1},
            projection: {_id: 0, title: 1, imdb: 1, runtime: 1},
        }

        const iterator = movies.find(query, options);
        if((await iterator.count()) === 0){
            console.log("No movies found with rating > 9");
        }

        await iterator.forEach(movie => console.log(movie));
    }catch(err){
        console.log(err);
    }
}

async function addNewRecord() {
    try{
        const database = client.db('sampel');
        const haiku = database.collection('books');

        const doc = {
            title: "The subtle art of not giving a f**k",
            content: "No bytes, no problem. Just insert a document in mongodb",
            author: "Mark Mason",
        }

        const result = await haiku.insertOne(doc);
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

async function addManyNewBooks() {
    try{
        const database = client.db('tutorial');
        const foods = database.collection('foods');

        const docs = [
            {name: "cake", healthy: false, tasty: true},
            {name: "lettuce", healthy: true, tasty: false},
            {name: "donut", healthy: false, tasty: true},
        ];

        const options = {ordered: true};

        const result = await foods.insertMany(docs, options);
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

async function updateARecord(){
    try{
        const database = client.db('tutorial');
        const foods = database.collection('foods');

        const filter = {name: "cake"};
        const updateDoc = {
            $set: {
                healthy: true,
            },
        };
        const options = {upsert: true};

        const result = await foods.updateOne(filter, updateDoc, options);
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

async function deleteOne(){
    try{
        const database = client.db('tutorial');
        const books = database.collection('books');
    
        const query = {title: "M"};
        const result = await books.deleteOne(query);
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

async function countDocuments(){
    try{
        const database = client.db('sample_mflix');
        const movies = database.collection('movies');

        const estimatedQueries = await movies.estimatedDocumentCount();

        const filter = {"imdb.rating": {$gt: 9.0}};
        const exactQueries = await movies.countDocuments(filter);

        console.log("The estimated count of total movies is: ", estimatedQueries);
        console.log("The count of the movies with imdb rating > 9 is:", exactQueries);
    }catch(err){
        console.log(err);
    }
}

async function countDistinct(){
    try{
        const database = client.db("sample_mflix");
        const movies = database.collection("movies");

        const fieldname = "genres";
        const distinctValues = await movies.distinct(fieldname);
        console.log(distinctValues);
    }catch(err){
        console.log(err);
    }
}