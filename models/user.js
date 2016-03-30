var db = require('../config/db.js');

exports.getAll = function(done) {
  console.log('Trying to get users');
  db.get().query('SELECT * FROM users', function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

exports.checkUserAvailability = function(user, done){
  console.log('Checking user availability for :');
  console.log( user.username);
  db.get().query('SELECT id, username, password FROM users where username = ?', [user.username], function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

exports.createNewUser = function(user, done){
  console.log('Creating new user for :');
  console.log( user.username);
  db.get().query('INSERT INTO users (username, password, salt, status, type, tenant_id, created_date) values (?, ?, ?, \'Active\', \'Standard\', 1, Now())',
                 [user.username, user.password, user.salt],
                 function (err, rows) {
                  if (err) return done(err);
                  findUserById(rows.insertId, function(err, rows){
                    if(err){
                      done(err, false);
                    }
                    if(rows.length)
                      done(null,rows);
                  });
                }
  )
}

function findUserById(userId, done){
  console.log('Find User by Id');
  console.log(userId);
  db.get().query('SELECT id, username FROM users where id = ?', [userId], function (err, rows) {
    if (err) return done(err)
    done(null, rows)
  })
}

exports.findUserById = findUserById;
