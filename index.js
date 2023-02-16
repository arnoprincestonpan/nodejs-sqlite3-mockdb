const sqlite3 = require("sqlite3").verbose()
const axios = require("axios")

const db = new sqlite3.Database('./mock.db', sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.error(err.message)

    console.log("connection successful")
})

axios
    .get("https://random-data-api.com/api/users/random_user")
    .then((response) => {
        // destructuring data
        const {data} = response;
        const {first_name} = data;
        const {last_name} = data;
        const {username} = data;
        const {email} =data;
        const {id} = data;
        const {password} = data;

        db.run("CREATE TABLE IF NOT EXISTS users(first_name, last_name, username, password, email, id)")

        const sql = "INSERT INTO users(first_name, last_name, username, password, email, id) VALUES(?,?,?,?,?,?)"
        
        db.run(sql, [first_name, last_name, username, password, email, id], (err) => {
            if(err) return console.error(err.message)
            console.log("a new user has been inserted.")
        })

        db.close((err) =>{
            if(err) return console.error(err.message)
        })
    }).catch((error) => {
        if (error) return console.error(error)
    })

const users = "SELECT * FROM users"

db.all(users, [], (err, rows) => {
    if(err) return console.log(err.message)

    console.log("List of users: ")
    rows.forEach(row => {
        console.log(row)
    })
})