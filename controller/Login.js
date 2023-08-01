import User from "../model/Usermodel.js";

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);
    if (!email || !password) {
      res.status(403).send({
        message: "wrong email or password",
      });
    } else {
      const FoundUser = await User.find({
        email: email,
        password: password,
      });
      console.log(FoundUser);
      if (FoundUser.length > 0) {
        res.status(200).send({
          message: `Welcome ${FoundUser[0].fullname}`,
          status: "200",
          user: FoundUser,
        });
      } else {
        res.status(403).send({
          message: "User does not exist",
        });
      }
    }
  } catch (err) {
    res.status(403).send({
      message: err.message,
    });
  }
};

export default UserLogin;
