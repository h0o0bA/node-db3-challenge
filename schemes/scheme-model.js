const db = require("../data/dbConfig");

module.exports = {
  find,
  findById,
  findSteps
  // add,
  // update,
  // remove
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes").where({ id });
  //   .first(); // if not destructured
}

function findSteps(scheme_id) {
  return db("steps as st")
    .join("schemes as sc", "st.scheme_id", "=", "sc.id")
    .select("st.step_number", "st.instructions")
    .orderBy("st.step_number", "asc")
    .groupBy("st.step_number")
    .where({ scheme_id });
}
