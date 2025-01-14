const express = require("express");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const session = require('express-session');
const { default: mongoose } = require("mongoose");
const flash = require("connect-flash");
const path = require("path");
const ejsMate = require("ejs-mate");
const dbUrl = "mongodb://127.0.0.1:27017/Feastara";
const Menu = require("./models/menu");
const methodOverride = require("method-override");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); 
const Order = require("./models/order");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));
app.use('/uploads', express.static('uploads'));


const sessionOptions = {
    secret: "Feastra_food",         // oour secret
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
}


app.use(session(sessionOptions));
app.use(flash()); 

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.newUser = req.user;
    console.log(res.locals.newUser);
    next();
})

app.use((req, res, next) => {
    if (!req.isAuthenticated() && req.originalUrl !== '/login') {
        req.session.returnTo = req.originalUrl; 
    }
    next();
});


app.get("/",(req,res)=>{
    res.render("lists/index.ejs");
})


// sigup route //
app.get("/register",(req,res)=>{
    res.render("users/signup.ejs");
});

app.post("/register",async(req,res,next)=>{
    try{
        let{username,email,password} = req.body;
        let newUser = new User({username,email});
        const registerUser = await User.register(newUser,password);
        console.log(registerUser);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Festara");
            res.redirect("/");
        })
    }
    catch(e){
        console.log(e);
        req.flash("error",e.message);
        res.redirect("/register");
    }
});

// login route
app.get("/login",(req,res)=>{
    res.render("users/login.ejs");
})

app.post("/login",passport.authenticate("local",{
    failureFlash:true,
    failureRedirect:"/login",
}),(req,res)=>{
    req.flash("success","Welcom Back !");
    const redirectUrl = req.session.returnTo || "/";
    delete req.session.returnTo; 
    res.redirect(redirectUrl);
});


// menu route
app.get("/menu",async(req,res)=>{
    const Menuitems = await Menu.find({});
    //console.log(Menuitems);
    res.render("lists/menu.ejs",{Menuitems});
})

// add new menu //
app.post("/menu",async(req,res)=>{
    if(!req.isAuthenticated()){
        req.flash("error","Log in first!");
        return res.redirect("/login");
    }
    try{
        const {name,category,price,availabiltiy,image} = req.body;
        const newMenu = new Menu({name,category,price,availabiltiy,image});
        await newMenu.save();
        req.flash("success","Menu Item added Successfully !");
        res.redirect("/menu");
    }
    catch(e){
        console.log(e);
        req.flash("error",e.message);
        res.redirect("/menu");
    }
});

// access menu//
app.get("/menu/:id",async(req,res)=>{
    if(!req.isAuthenticated()){
        req.flash("error","Log in first!");
        return res.redirect("/login");
    }
    const menuId = req.params.id;
    let menu = await Menu.findById(menuId);
    console.log("hello");
    console.log(menu);
    let originalImage = menu.image; 
    res.render("lists/edit.ejs",{menu,originalImage});
})

app.put("/menu/:id", upload.single('image'), async (req, res) => {
    if(!req.isAuthenticated()){
        req.flash("error","Log in first!");
        return res.redirect("/login");
    }
    try {
        const menuId = req.params.id;
        const { name, category, price } = req.body;
        let updatedMenu = await Menu.findById(menuId);

        // Check if a new image was uploaded
        let image = req.file ? `/uploads/${req.file.filename}` : updatedMenu.image; // Using relative path

        updatedMenu.name = name;
        updatedMenu.category = category;
        updatedMenu.price = price;
        updatedMenu.image = image;

        await updatedMenu.save();

        req.flash("success", "Menu item updated successfully!");
        res.redirect(`/menu`);
        } 
        catch (e) {
            console.log(e);
            req.flash("error", e.message);
            res.redirect("/menu");
        }
});


app.delete("/menu/:id",async(req,res)=>{
    if(!req.isAuthenticated()){
        req.flash("error","Log in first!");
        return res.redirect("/login");
    }
    try{
        const menuId = req.params.id;
        const menu = await Menu.findByIdAndDelete(menuId);
        if (!menu) {
            req.flash("error", "Menu item not found.");
            return res.redirect("/menu");
        }
        req.flash("success","Menu Deleted !");
        res.redirect("/menu");
    }
    catch(e){
        console.log(e);
        req.flash("error",e.message);
        res.redirect("/menu");
    }
});

app.get("/orders",async(req,res)=>{
    if(!req.isAuthenticated()){
        return res.redirect("/login");
    }
    const orders = await Order.find({}).populate('items.menuItem.name').exec();
    console.log(orders);
    res.render("lists/orders.ejs",{orders});
})

// order//
app.post("/order", async (req, res) => {
    if(!req.isAuthenticated()){
        req.flash("error","You have to log in");
        return res.redirect("/login");
    }
    try {
      const { menuId, quantity } = req.body;  
      console.log(req.body); 
  
      const userId = req.user;  // Assuming user is logged in
  
      // If quantity is missing or invalid
      if (!quantity || quantity <= 0) {
        req.flash("error", "Invalid quantity.");
        return res.redirect("/menu");
      }
  
      const menudish = await Menu.findById(menuId);
      if (!menudish) {
        req.flash("error", "Menu item not found.");
        return res.redirect("/menu");
      }
  
      // Proceed to create the order
      const order = new Order({
        userId: userId,
        items: [
          {
            menuItem: menudish._id,
            quantity: parseInt(quantity, 10),
          },
        ],
        totalAmount: menudish.price * quantity, 
        status: "Completed", 
      });
  
      await order.save();
  
      req.flash("success", "Order placed successfully!");
      res.redirect("/menu");
    } catch (e) {
      console.error(e);
      req.flash("error", "An error occurred while placing the order.");
      res.redirect("/menu");
    }
  });


  
 // contest// 
app.get('/contest', (req, res) => {
    const tokenNumber = Math.floor(Math.random() * 1000000);

    // data //
    const contest = {
        title: '#BestOrderChallenge',
        description: 'Stand a chance to win a ₹500 gift card by placing the best order!',
        tokenNumber:tokenNumber,
    };
    res.render('lists/contest.ejs', { contest });
});

  

// logout route 
app.get("/logout",(req,res)=>{
    console.log("Logout route accessed");
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You logged Out !");
        res.redirect("/");
    })
})

main()
.then((res)=>{
    console.log(res);
    console.log("working db");
})
.catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(dbUrl);
}


app.listen("5000",()=>{
    console.log("server is listening to port 5000");
});