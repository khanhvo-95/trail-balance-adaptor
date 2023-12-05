import { createConnection } from 'mysql2';

const db = createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});
  
export default db;