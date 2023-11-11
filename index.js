const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter =require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const app = express();  //app object describes all different things that web servers can do -> server on the local machine
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieSession({
    keys: ['eurjhjk45769kljl']
}));
app.use(authRouter);
app.use(productsRouter);
app.use(adminProductsRouter);
app.use(cartsRouter);

app.listen(3000, ()=>{   // setting server to listen to the request at port 3000  now host name and port are known to the server and it just listen the req
    console.log("listening");
});