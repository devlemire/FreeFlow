var moment = require('moment')
var jwt = require('jwt-simple')
var passwordHash = require('password-hash')

const { TOKEN_SECRET } = process.env

function createJWT(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment()
      .add(14, 'days')
      .unix()
  }
  return jwt.encode(payload, TOKEN_SECRET)
}

module.exports = {
  login: async (req, res) => {
    const db = req.app.get('db')
    const { username, password } = req.body

    const [user] = await db.login.getUser({ username })

    if (!user) return res.status(409).send({ error: 'User was not found in the DB' })

    if (passwordHash.verify(password, user.password)) {
      return res.status(200).send({ user, token: createJWT(user.username) })
    } else {
      return res.status(409).send({ error: 'Username and password did not match' })
    }
  }
}
