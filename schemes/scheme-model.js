const db = require("../data/dbConfig");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
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

async function add(scheme) {
  const [id] = await db("schemes").insert(scheme);
  return findById(id);
}

async function update(scheme, id) {
  const newScheme = await db("schemes")
    .update(scheme)
    .where({ id });
  if (newScheme) {
    return findById(id);
  }
  return null;
}

async function remove(id) {
  const deleted = await db("schemes")
    .where({ id })
    .del();
  return deleted;
}
