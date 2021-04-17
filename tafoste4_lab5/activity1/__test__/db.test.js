const { connection } = require("mongoose");
const { connect, close } = require("../utils/db");
/*******************************************************************************
 * @file db.test.js
 * @version 2021.04.16
 * @author Ty Foster
 *
 * Tests db.js implementation
 */

describe('Connect to database', () => {
  test('no parameters passed', async () => {
    await connect();
    expect(connection.db.databaseName).toEqual('test');
    expect(connection.host).toEqual('localhost');
    expect(connection.port).toEqual(27017);
    await close();
  });
});
