const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json()); // Parse JSON requests

const CONNECTION_STRING = "mongodb://localhost:27017/examenportfolio";
const DATABASE_NAME = "examenportfoliodb";
let database;

app.listen(5038, () => {
    console.log("Server listening on port 5038");

    MongoClient.connect(CONNECTION_STRING)
        .then(client => {
            console.log("Mongo DB Connection Successful");
            database = client.db(DATABASE_NAME);

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

app.get("/api/examenportfolio/get-notes", async (request, response) => {
    try {
        const result = await database.collection("examenportfoliocollection").find({}).toArray();
        response.send(result);
    } catch (error) {
        console.error("Error fetching notes:", error);
        response.status(500).send("Internal Server Error");
    }
});

app.post("/api/examenportfolio/add-notes", async (request, response) => {
    // console.log(request.body.newNotes);
    console.log("Before countDocuments call");
    try {
        const count = await database.collection("examenportfoliocollection").countDocuments();
        console.log(count);
        await database.collection("examenportfoliocollection").insertOne({
            TaskId: (parseInt(count) + 1),
            TaskTitle: request.body.newNotes
        });
        response.json("Added Successfully");
    } catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal Server Error");
    }
    console.log("After countDocuments call");
});

app.delete('/api/examenportfolio/delete-notes', (request, response) => {
    database.collection("examenportfoliocollection").deleteOne({
        id: request.query.id
    }, (error, result) => {
        if (error) {
            console.error("Error deleting note:", error);
            response.status(500).send("Internal Server Error");
        } else {
            response.json("Deleted Successfully");
        }
    });
});

app.put('/api/examenportfolio/edit-notes', async (request, response) => {
    try {
        const { TaskId, TaskList } = request.body;

        await database.collection("examenportfoliocollection").updateOne(
            { TaskId: TaskId },
            { $set: { TaskList: TaskList } }
        );
        response.json("Task edited successfully");
        console.log("Task edited successfully");
    } catch (error) {
        console.error("Error:", error);
    }

});

app.put('/api/examenportfolio/login', async (request, response) => {
    try {
        const result = await database.collection("examenportfoliousercollection").findOne( { UserEmail: request.body.email } );
        console.log(result);
        if (atob(result.UserPassword) !== request.body.password) {
            response.json({"statusmessage": "error", "message": "password is incorrect"});
        }
        response.json({"statusmessage": "success", "message": "success", "UserRole" : result.UserRole});
    } catch (error) {
        console.error("Error: ", error);
    }
});

app.post('/api/examenportfolio/signup', async (request, response) => {
    try {
        // Encrypt password
        let encryptedPassword = btoa(request.body.password);

        const count = await database.collection("examenportfoliousercollection").countDocuments();
        await database.collection("examenportfoliousercollection").insertOne({
            UserId: (parseInt(count) + 1),
            UserEmail: request.body.email,
            UserPassword: encryptedPassword,
            UserRole: "user"
        });
        response.json("Added Successfully");
    } catch (error) {
        console.log("Error: ", error)
    }
});