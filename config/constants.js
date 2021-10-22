const ValidName = {
  MIN_LENGTH_NAME: 3,
  MAX_LENGTH_NAME: 30,
}

const StatusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UN_AUTHORIZED:401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
}

const Salt_Factor = 6

module.exports = { StatusCode, ValidName, Salt_Factor }
