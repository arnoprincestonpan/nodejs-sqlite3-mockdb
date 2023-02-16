const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database('./mock.db', sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.error(err.message)

    console.log("connection successful")
})

db.run("CREATE TABLE IF NOT EXISTS users(first_name, last_name, user_name, password, email, id)")

const sql = "INSERT INTO users(first_name, last_name, user_name, password, email, id) VALUES(?,?,?,?,?,?)"

db.run(sql, ["mike", 'codes', 'mike_codes', '123', 'mikec@mail.com', 1], (err) => {
    if(err) return console.error(err.message)
    console.log("a new user has been inserted.")
})

const users = "SELECT * FROM users"

db.all(users, [], (err, rows) => {
    if(err) return console.log(err.message)

    console.log("List of users: ")
    rows.forEach(row => {
        console.log(row)
    })
})

db.close((err) =>{
    if(err) return console.error(err.message)
})