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
//Storing read/write Note into variables
const readNotes = () => {
    fs.readFile(__dirname + "/db/db.json", (err, response) => {
        if (err) throw err;
        notes = JSON.parse(response); 
    });
};
const writeNotes= ()=>{
    fs.readFile(__dirname + "/db/db.json", (err, response)=>{
        if(err) throw err;
        notes= JSON.parse(reponse);

    })
}
// HTML ROUTER
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
// API ROUTE
// ADD NOTE
// Setup the /api/notes POST route
// DELETE NOTE