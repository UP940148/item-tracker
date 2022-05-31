const database = require('sqlite-async');
const DBSOURCE = 'tracking.db';
let db;

async function createDatabase() {
  console.log();
  // Create initial connection to database
  try {
    db = await database.open(DBSOURCE);
    console.log(`Connection to '${DBSOURCE}' has been established.`);
  } catch (err) {
    console.error(`Error connecting to '${DBSOURCE}'.`);
    throw err;
  }

  // Create user table
  try {
    await db.run(`
      CREATE TABLE IF NOT EXISTS user (
        userId PRIMARY KEY NOT NULL,
        username text UNIQUE NOT NULL
      );
    `);
    console.log('User table created!');
  } catch (err) {
    console.log('Error creating user table.');
    throw err;
  }

  // Create item table
  try {
    await db.run(`
      CREATE TABLE IF NOT EXISTS item (
        itemId integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        name text NOT NULL,
        picture text,
        barcode text,
        notes text
      );
    `);
    console.log('Item table created!');
  } catch (err) {
    console.log('Error creating item table.');
    throw err;
  }

  // Create location table
  try {
    await db.run(`
      CREATE TABLE IF NOT EXISTS location (
        locationId integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        name text UNIQUE NOT NULL,
        address1 text,
        address2 text,
        town text,
        postcode text
      );
    `);
    console.log('Location table created!');
  } catch (err) {
    console.log('Error creating location table.');
    throw err;
  }
}

createDatabase();
