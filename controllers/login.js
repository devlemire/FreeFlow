const moment = require('moment')
const passwordHash = require('password-hash')

const { TOKEN_SECRET } = process.env

module.exports = {
  login: async (req, res) => {
    const db = req.app.get('db')
    const { username, password } = req.body

    const [user] = await db.login.getUser({ username })

    if (!user) return res.status(409).send({ error: 'User was not found in the DB' })

    if (passwordHash.verify(password, user.password)) {
      const formatted_user = { id: user.id, username: user.username }
      return res.status(200).send({ user: formatted_user })
    } else {
      return res.status(409).send({ error: 'Username and password did not match' })
    }
  }
}
