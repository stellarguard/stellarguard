const { Pool } = require('pg');
const config = require('../../config');
const camelCase = require('lodash.camelcase');

const pool = new Pool(config.pg);

function normalizeRows(rows) {
  return rows.map(row => {
    const normalizedRow = {};
    Object.entries(row).forEach(([key, value]) => {
      normalizedRow[camelCase(key)] = value;
    });
    return normalizedRow;
  });
}

async function query(q, values = []) {
  const { rows, rowCount } = await pool.query(q, values);
  return {
    rows: normalizeRows(rows),
    rowCount
  };
}

exports.pool = pool;
exports.query = query;
