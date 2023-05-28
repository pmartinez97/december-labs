// TO DO: Add JWT from Access-token to validate if user is logged in
const auth = async (req, res, next) => {
  const userLoggedIn = req.headers['user-id'];
  console.log(userLoggedIn)

  if (!userLoggedIn) {
    return res.status(400).send("This user doesn't have the necessary permissions to execute this action")
  }

  next()
}

module.exports = auth;