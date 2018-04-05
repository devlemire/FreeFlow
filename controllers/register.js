var passwordHash = require('password-hash')
var moment = require('moment')
var jwt = require('jwt-simple')

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
  register: async (req, res) => {
    try {
      const db = req.app.get('db')
      const { password, confirm_password, email, username, first_name, last_name } = req.body

      if (password !== confirm_password) return res.status(409).send({ error: 'Passwords do not match' })
      const [{ count: emailCount }] = await db.register.checkEmailTaken({ email })
      if (emailCount == 1) return res.status(409).send({ error: 'Email taken' })
      const [{ count: userCount }] = await db.register.checkUserTaken({ username })
      if (userCount == 1) return res.status(409).send({ error: 'Username taken' })

      const hashedPassword = passwordHash.generate(password, { algorithm: 'sha256' })
      const [user] = await db.register.register({ firstName: first_name, lastName: last_name, password: hashedPassword, username, email })
      return res.status(200).send({ user, token: createJWT(username) })
    } catch (err) {
      console.error('Register endpoint failed:', err)
      return res.status(500).send(err)
    }
  }
}
