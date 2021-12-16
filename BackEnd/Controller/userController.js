const userSchema = require("../Schema/UserSchems")
const sendToken = require("../utils/jwtToken");


// Register A new user
exports.registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await userSchema.create({
        name,
        email,
        password
    })

    if(!user){
        return res.status(401).json({message: 'Invalid username or password'} , {success:false});
    }

    sendToken(user, 200, res);

    

}

// Login User
exports.loginUser = async (req, res, next) => {
  const {email,password} = req.body;

  if(!email || !password) {
    return res.status(401).json({ Error: "Fill the data Correctly" });
  }
  const user = await userSchema.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ Error: "invalid email or password" });
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return res.status(401).json({ Error: "invalid email or password" });
  }

  sendToken(user, 201, res);

  
}

//Update User
exports.updateUsers = async (req, res, next) => {

    user = await userSchema.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    
    if (!user) {
        return res.status(401).json({message: 'Invalid username or password'} , {success:false});
      } 
     
   
      res.status(200).json({
        success: true,
        user,
      });
    
  };

//Delete a user
exports.deleteUser = async (req, res, next) => {
    let user = await userSchema.findById(req.params.id);

    if (!user) {
      return res.status(401).json({message: 'Invalid username or password'} , {success:false});
    }
  
    await user.deleteOne();
    res.status(200).json({
      success: true,
      message: "user Removed successfully",
    });
  };