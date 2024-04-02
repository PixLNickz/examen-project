const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const { ObjectId } = require('mongodb');

const app = express();

app.use(cors());
app.use(express.json()); // Parse JSON requests

const CONNECTION_STRING = "mongodb://localhost:27017/examenportfolio";
const DATABASE_NAME = "examenportfoliodb";
let database;

// Database connection check
app.listen(5038, () => {
    console.log("Server listening on port 5038");

    MongoClient.connect(CONNECTION_STRING)
        .then(client => {
            console.log("Mongo DB Connection Successful");
            database = client.db(DATABASE_NAME);

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

// Get notes/tasks from database
app.get("/api/examenportfolio/get-notes", async (request, response) => {
    try {
        const result = await database.collection("examenportfoliocollection").find({}).toArray();
        response.send(result);
    } catch (error) {
        console.error("Error fetching notes:", error);
        response.status(500).send("Internal Server Error");
    }
});

// Add notes/tasks to database
app.post("/api/examenportfolio/add-notes", async (request, response) => {
    try {
        await database.collection("examenportfoliocollection").insertOne({
            TaskTitle: request.body.TaskTitle,
            TaskContent: request.body.TaskContent,
            TaskColor: request.body.TaskColor,
            TaskPriority: request.body.TaskPriority,
            TaskList: 1
        });
        response.json("Added Successfully");
    } catch (error) {
        console.error("Error:", error);
        response.status(500).send("Internal Server Error");
    }
});

// Delete notes/tasks from database
app.delete('/api/examenportfolio/delete-notes', async (request, response) => {
    try {
        await database.collection("examenportfoliocollection").deleteOne({
            _id: new ObjectId(request.body._id)
        });
        response.json("Deleted Successfully");
    } catch (error) {
        console.error(error);
    }

});

// Database calls for dragging notes/tasks to other lists
app.put('/api/examenportfolio/edit-notes', async (request, response) => {
    try {
        const { _id, TaskList } = request.body;
        await database.collection("examenportfoliocollection").updateOne(
            { _id: new ObjectId(_id) },
            { $set: { TaskList: TaskList } }
        );
        response.json("Task edited successfully");
        console.log("Task edited successfully");
    } catch (error) {
        console.error("Error:", error);
    }

});

// Get accounts from database
app.get("/api/examenportfolio/get-accounts", async (request, response) => {
    try {
        const result = await database.collection("examenportfoliousercollection").find({}, { projection: { _id: 1, UserEmail: 1, UserRole: 1 } }).toArray();
        response.send(result);
    } catch (error) {
        console.error("Error fetching accounts:", error);
        response.status(500).send("Internal Server Error");
    }
});

// Database checks if password and email are correct, sends back logged in with encrypted role
app.put('/api/examenportfolio/login', async (request, response) => {
    try {
        const result = await database.collection("examenportfoliousercollection").findOne( { UserEmail: request.body.email } );
        console.log(result);
        if (atob(result.UserPassword) !== request.body.password) {
            console.log(atob(result.UserPassword));
            response.json({"statusmessage": "error", "message": "password is incorrect"});
        }
        response.json({"statusmessage": "success", "message": "success", "UserRole" : result.UserRole});
    } catch (error) {
        console.error("Error: ", error);
    }
});

// When called, add account to database with the correct input
app.post('/api/examenportfolio/signup', async (request, response) => {
    try {
        // Encrypt password
        let encryptedPassword = btoa(request.body.password);

        await database.collection("examenportfoliousercollection").insertOne({
            UserEmail: request.body.email,
            UserPassword: encryptedPassword,
            UserRole: "user"
        });
        response.json("Added Successfully");
    } catch (error) {
        console.log("Error: ", error)
    }
});

// Deletes account from database with given ID
app.delete('/api/examenportfolio/delete-user', async (request, response) => {
    try {
        await database.collection("examenportfoliousercollection").deleteOne({
            _id: new ObjectId(request.body._id)
        });
        response.json("Deleted Successfully");
    } catch (error) {
        console.error(error);
    }
});

// Changes role of account in database with given ID
app.put('/api/examenportfolio/change-role', async (request, response) => {
    try {
        const result = await database.collection("examenportfoliousercollection").findOne({ _id: new ObjectId(request.body._id) });
        if (result.UserRole === 'user') {
            await database.collection("examenportfoliousercollection").updateOne({ _id: new ObjectId(request.body._id) }, {$set: { UserRole: 'admin'}})
        } else {
            await database.collection("examenportfoliousercollection").updateOne({ _id: new ObjectId(request.body._id) }, {$set: { UserRole: 'user'}})
        }
        response.json("Role Changed Successfully");
    } catch (error) {
        console.error(error);
    }
});