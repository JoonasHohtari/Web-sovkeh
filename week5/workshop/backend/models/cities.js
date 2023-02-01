const pool = require("../db/pool");

const cities = {
  findAll: () =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }

        connection.query("SELECT * FROM cities", (err, result) => {
          connection.release();
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    }),

  findCityById: (id) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        connection.query(
          "SELECT * FROM cities WHERE ID=?",
          id,
          (err, result) => {
            connection.release();
            if (err) {
              return reject(err);
            }
            resolve(result);
          }
        );
      });
    }),

  findByCity: (city) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }
        const selectQuery =
          "SELECT * FROM cities WHERE capital LIKE ? AND country LIKE ?;";
        connection.query(
          selectQuery,
          [city.capital, city.country],
          (err, result) => {
            connection.release();
            if (err) {
              return reject(err);
            }
            resolve(result);
          }
        );
      });
    }),
  create: (city) =>
    new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }

        const query = connection.query(
          "INSERT INTO cities SET ?;",
          city,
          (err, result) => {
            connection.release();
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
    }),
  deleteById: (id) =>
    new Promise((resolve, reject) => {
      const deleteQuery = "DELETE FROM cities WHERE id=?;";
      pool.getConnection((err, connection) => {
        if (err) {
          return reject(err);
        }

        connection.query(deleteQuery, id, (err, result) => {
          connection.release();
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    }),
};

module.exports = cities;
