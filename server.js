const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');
const noteData = require('./db/db.json')
const api = require('./db/db.json');

const PORT = process.env.port || 3000;

const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// app.use('/api', api);



// GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

// gets the notes converted to json
app.get('/api/notes', (req, res) => res.json(noteData));

// creates an object for the new data to save into and write it into the db.json file
app.post('/api/notes', (req, res) => {
    const newNote = {
        id: uniqid(),
        title: req.body.title,
        text: req.body.text
    }

    noteData.push(newNote);

    fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(noteData), (err) => {
        if(err) {
            console.log('Error saving note');
        } else {
            res.json(newNote);
        }
    });
});

app.delete('/notes/:id', (req, res) =>) {
    
}

// GET Route for homepage
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
