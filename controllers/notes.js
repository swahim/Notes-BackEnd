const client = require("../config/db");

exports.addNote = (req, res) => {
    const {heading, content} = req.body;
    client.query(`INSERT INTO notes(email, heading, content) VALUES('${req.email}','${heading}', '${content}')`).then((data) => {
        res.status(200).json({
            message: "Note added successfully",
        });
    }).catch((err) => {
        res.status(500).json({
            message: "DB error",
        })
    })
}

exports.getAllNotes = (req, res) => {
    client.query(`SELECT name FROM users WHERE email = '${req.email}'`).then((data) => {
        // console.log(data.rows[0].name);
        const name = data.rows[0].name;
        client.query(`SELECT * FROM notes WHERE email = '${req.email}'`).then((data) => {
            const noteData = data.rows;
            // console.log(noteData);
            const filteredNotes = noteData.map((note) => {
                return ({
                    noteId : note.noteid,
                    heading : note.heading, 
                    content : note.content
                })
            }) 
            res.status(200).json({
                name,
                message: "You are logged In!",
                data : filteredNotes
            })
        })
        
    })
}

exports.updateNote = (req, res) => {
    const noteId = req. noteId;
    const {heading, content} = req.body;
    client.query(`UPDATE notes SET heading = '${heading}', content = '${content}' WHERE noteid = '${noteId}'`).then((result) => {
        res.status(200).json({message: "Note updated successfully"});
    }).catch((err) => {
        if(err){
            console.log(err);
            res.status(500).json({ message : "DB Error"});
        }
        
    })
}

exports.deleteNote = (req, res) => {
    const noteId = req.noteId;
    client.query(`DELETE FROM notes WHERE noteid = '${noteId}'`).then((result) => {
        res.status(200).json({ message : "Note deleted successfully"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send("DB error");
    })
}

exports.getPreviousInfo = (req, res) => {
    const noteId = req.noteId;
    client.query(`SELECT * FROM notes WHERE noteid = '${noteId}'`).then((result) => {
        res.status(200).send(result.rows);
    }).catch((err) => {
        if(err){
            res.status(500).json({ message :  "New Error"});

        }
    })
}