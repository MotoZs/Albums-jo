const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('albums.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS albums (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    band TEXT NOT NULL,
    title TEXT NOT NULL,
    year INTEGER NOT NULL,
    genre TEXT NOT NULL
  )`);

  const stmt = db.prepare("INSERT INTO albums (band, title, year, genre) VALUES (?, ?, ?, ?)");
  
  stmt.run("Metallica", "Master of Puppets", 1986, "Trash Metal");
  stmt.run("Pink Floyd", "The Dark Side of the Moon", 1973, "Progressive Rock");
  stmt.run("Nirvana", "Nevermind", 1991, "Grunge");
  stmt.run("AC/DC", "Back in Black", 1980, "Hard Rock");
  stmt.run("Queen", "A Night at the Opera", 1975, "Rock");
  stmt.run("Green Day", "Dookie", 1994, "Punk Rock");
  stmt.run("Linkin Park", "Hybrid Theory", 2000, "Nu Metal");
  stmt.run("Skillet", "Rise", 2010, "Hard Rock");
  stmt.run("Black Sabbath", "Paranoid", 2020, "Metal");

  stmt.finalize();
});

db.close();

console.log("albums.db sikeresen létrehozva és feltöltve!");
