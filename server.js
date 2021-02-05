const { response } = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path');
const { isBuffer } = require('util');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Serve a public folder
app.use(express.static("public"));


app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})

// HTML Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    return res.sendFile(path.join(__dirname, "db/db.json"));
});

// Setup the /api/notes POST route
app.post("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf-8", function (err, notedata) {

        let savedNotes = JSON.parse(notedata);
        console.log(savedNotes)
        let newNote = req.body;
        newNote.id = savedNotes.length + 1;
        savedNotes.push(newNote)

        fs.writeFile("./db/db.json", JSON.stringify(savedNotes), "utf-8", function (err) {
            if (err) throw err;
            console.log('Saved!')
        })
    })
    res.send("Done")
})
// DELETE NOTE
app.delete("/api/notes/:id", function (req, res) {
    var id = req.params.id
    fs.readFile("./db/db.json", "utf-8", function (error, data) {
        if (error) throw error;

        var savedNote = JSON.parse(data)
        var deleteNote = savedNote.findIndex((x) => x.id == id)
        savedNote.splice(deleteNote, 1)

        fs.writeFile("./db/db.json", JSON.stringify(savedNote), "utf-8", function (error) {
            if (error) throw error;
            console.log("Deleted!")
        })
    })
    res.send("Done!")
})