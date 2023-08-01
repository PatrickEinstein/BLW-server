import mailer from "../config/nodemailer.js";
import User from "../model/Usermodel.js"

const UserSignUp = async (req, res) => {
  const {title,gender,date,course, church,city,zone,state, fullname, email, password, phone, confirmPassword } = req.body;

  try {
    if (!fullname || !email || !phone || !password  ) {
      res.status(400).send({
        message: "Please provide all credentials",
      });
    } else {
      if (password !== confirmPassword) {
        res.status(400).send({
          message: "Password mismatch",
        });
      } else {
        
        const existingUser = await User.findOne({
          email: email,
          password: password,
        });

        if (existingUser) {
          res.status(400).send({
            message: "User already exists",
          });
          console.log(existingUser);
        } else {
          const newUser = await new User({
            fullname,
            email,
            password,
            phone,
            date,
            course,
            title,gender, church,city,zone,state,
          });

          const createdUser = await newUser.save();
          console.log(createdUser);

          const mail ="stephamajoyi93@gmail.com"
          const subject = "HEALING STREAMS REGISTERATIONS"
         const text =`my name is ${createdUser.fullname}, from ${createdUser.church} in ${createdUser.zone} zone in ${createdUser.state} state i will be patriciating in the programme`
          mailer(mail, subject, text)

          
          const subject2 = "HEALING STREAMS REGISTERATIONS"
         const text2 =`Welcome ${createdUser.fullname}, We welcome  you on behalf of our man of God Pastor Chris Oyakhiome DSC DD`
          mailer(email, subject2, text2)

          res.status(200).send({
            message: `welcome ${createdUser.fullname}, you have successfully resistered`,
            user: createdUser,
            status: "200",
          });
        }
      }
    }
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};

export default UserSignUp;
