import path from 'path';

const electron = window.require("electron");

const app = (electron.app || electron.remote.app);
export const userDir = path.join(app.getPath('userData'),
                                 'databases/my-app.sqlite');

const sqlite3 = window.require('sqlite3');
const db = new sqlite3.Database(userDir);
db.close();

export const knex = window.require('knex')({
  client:"sqlite3",
  connection:{
    filename: userDir
  },
  useNullAsDefault: true
});

knex.schema.createTableIfNotExists('ISSUE', (issue) => {
  issue.string('id').primary();
  issue.string('description');
  issue.timestamps(true, true);
}).createTableIfNotExists('COMMENTS', (comment) => {
  comment.increments().primary();
  comment.string('comment').notNullable();
  comment.string('todo').defaultTo('');
  comment.timestamps(true, true);
  comment.string('issue-id').notNullable();
  comment.foreign('issue-id')
    .references('id').inTable('ISSUE')
    .onDelete('CASCADE');})
  .then(
    (...vals) => console.log('success '),
    (...vals) => console.log('why did you fail? ', vals)
  );
