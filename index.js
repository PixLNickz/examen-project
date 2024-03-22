var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

var CONNECTION_STRING = "mongodb+srv://examenportfolioadmin:ExamenPortfolio!h@examenportfolio.5yfyomc.mongodb.net/?retryWrites=true&w=majority&appName=ExamenPortfolio";
var DATABASENAME = "examenportfoliodb";
var database;

app.listen(5038, () => {
    console.log("Server listening on port 5038");

    Mongoclient.connect(CONNECTION_STRING)
        .then(client => {
            console.log("Mongo DB Connection Successful");
            database = client.db(DATABASENAME);

            // Check MongoDB connection status after connection is established
            app.get("/check-connection", (req, res) => {
                if (database) {
                    res.status(200).json({ message: "MongoDB connection is established" });
                } else {
                    res.status(500).json({ message: "MongoDB connection is not established" });
                }
            });
        })
        .catch(error => {
            console.error("Failed to connect to MongoDB:", error);
        });
});

app.get("api/examenportfolio/get-notes", async (request, response) => {
    try {
        const result = await database.collection("examenportfoliocollection").find({}).toArray();
        response.send(result);
    } catch (error) {
        console.error("Error fetching notes:", error);
        response.status(500).send("Internal Server Error");
    }
});

app.post("/api/examenportfolio/add-notes",multer().none(),(request,response)=>{
    database.collection().count({},function(error,numOfDocs){
        database.collection("examenportfoliocollection").insertOne({
            id:(numOfDocs+1).toString(),
            description:request.body.newNotes
        });
        response.json("Added Successfully")
    });
})

app.delete('/api/examenportfolio/delete-notes',(request,response)=>{
    database.collection("examenportfoliocollection").deleteOne({
        id:request.query.id
    });
    response.json("Deleted Successfully")
})