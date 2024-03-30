const express = require('express')
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const app = express()
const dbPath = path.join(__dirname, 'cricketTeam.db')
let db = null
const initialize = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running')
    })
  } catch (e) {
    console.log(`DB Error:${e.message}`)
    process.exit(1)
  }
}
initialize()
const convertDbObject = dbobject => {
  return {
    playerId: dbobject.player_id,
    playerName: dbobject.player_name,
    jerseyNumber: dbobject.jersey_number,
    role: dbobject.role,
  }
}
app.get('/players/', async (req, res) => {
  const books = `select * from cricket_team order by player_id;`
  const allbooks = await db.all(books)
  res.send(allbooks.map(eachPlayer => convertDbObject(eachPlayer)))
})

module.exports = app
