const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('albums.db', (err) => {
  if (err) {
    console.error('Nem sikerült megnyitni az adatbázist', err.message);
  } else {
    console.log('Csatlakozva az albums.db adatbázishoz');
  }
});

// Adatbázis inicializálás
db.run(`CREATE TABLE IF NOT EXISTS albums (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  band TEXT NOT NULL,
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  genre TEXT NOT NULL
)`);

app.get('/albums', (req, res) => {
  db.all('SELECT * FROM albums', [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

app.post('/albums', (req, res) => {
  const { band, title, year, genre } = req.body;
  if (!band || !title || !year || !genre) return res.status(400).send('Hiányzó adat');

  const sql = 'INSERT INTO albums (band, title, year, genre) VALUES (?, ?, ?, ?)';
  db.run(sql, [band, title, year, genre], function(err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).send('Hozzáadva');
    }
  });
});

app.put('/albums/:id', (req, res) => {
  const { id } = req.params;
  const { band, title, year, genre } = req.body;
  if (!band || !title || !year || !genre) return res.status(400).send('Hiányzó adat');

  const sql = 'UPDATE albums SET band = ?, title = ?, year = ?, genre = ? WHERE id = ?';
  db.run(sql, [band, title, year, genre, id], function(err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send('Módosítva');
    }
  });
});

app.delete('/albums/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM albums WHERE id = ?';
  db.run(sql, id, function(err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send('Törölve');
    }
  });
});

app.listen(3000, () => {
  console.log('API fut a 3000-es porton!');
});
