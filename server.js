const express = require('express')
const sqlite = require('sqlite3').verbose()
const app = express()
const port = 3001
const cors=require("cors")
app.use(cors())
app.use(express.json())

const db = new sqlite.Database('database.db', (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("OK")
    }
})

app.get('/', (req, res) => {
    db.all('SELECT * FROM data', [], (err, data) => {
        res.send(data)
    })
})

app.get('/data/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    db.get('SELECT * FROM data WHERE data_id=?', [id], (err, data) => {
        res.send(data)
    })
    
})
app.post('/new', (req,res) => {
    
    const image = req.body.image
    const name = req.body.name
    const price = req.body.price
    const info = req.body.info
    console.log(name)

    db.run('INSERT INTO data (image,name,price,info) values (?,?,?,?)', [image,name,price,info],(err) => {
        res.send("OOKKK")
    })
})
 app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const image = req.body.image
    const name = req.body.name
    const price = req.body.price
    const info = req.body.info
    db.run('UPDATE data SET image=?, name=?, price=?, info=? WHERE data_id=?', [image,name,price,info,id], (err, data) => {
    res.send(`product has been updated`)
    })
  });
  app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.get('DELETE FROM data WHERE data_id=?', [id], (err, data) => {
    res.send(`product has been deleted`)
    })
  });

app.listen(port)
