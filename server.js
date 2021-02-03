const { response } = require('express');
const express= require('express');
const fs= require('fs');
const path= require('path');
const { isBuffer } = require('util');
const app = express();
const PORT= process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Serve a public folder
app.use(express.static("public"));


app.listen(PORT,()=>{
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
app.post("/api/notes", function(request, response){
    fs.readFile("./db/db.json", "utf-8", function(err, notedata){

        let savedNotes= JSON.parse(notedata);
        console.log(savedNotes)
        let newNote= request.body;
        newNote.id= savedNotes.length +1;
        savedNotes.push(newNote)

        fs.writeFile("./db/db.json", JSON.stringify(savedNotes), "utf-8", function(err){
            if(err) throw err;
            console.log('Saved!')
        })
    })
    response.send("Done")
})
// DELETE NOTE
// app.delete('/api/notes/:id', (req, res) => {
    // Read json data in db.json
    // Target objects (notes) in the db.json array
    // Parse json data and assign the notes a unique ID
    // For loop over them
    // stringify json data
    // res.json()
// })