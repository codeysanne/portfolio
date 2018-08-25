const express = require('express');
const bodyParser = require('body-parser');
// const exphbs = require('express-handlebars');
const path = require('path'); /* a core module of nodenodemon */
const nodemailer = require('nodemailer');

// initialise app variable
const app = express();

// setting up middleware
// view engine setup
// app.engine('hbs', exphbs()); /* hbs will be the name of the file extension */
// app.set('view engine', 'hbs');
// app.set('views', './src'); /* hbs will be the name of the file extension */
// app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views')); /* hbs will be the name of the file extension */
app.set('view engine', 'pug');

// defining static folder
app.use('/src', express.static(path.join(__dirname, 'src')));

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    // res.send('hello');
    // res.render('contactform'); /* views/contactform.hbs */
    res.render('index', {
        testVar: 'hello from testVar'
    }); /* views/contactform.hbs */
});

// app.post('/send', (req, res) => {
//     const output = `
//         <p>you got mail</p>
//         <h3>contact details</h3>
//         <ul>
//             <li>name: ${req.body.name}</li> /* properties of body must match name attribute of inputs */
//             <li>company: ${req.body.company}</li>
//             <li>phone: ${req.body.phone}</li>
//             <li>email: ${req.body.email}</li>
//         </ul>
//         <h3>message</h3>
//         <p>${req.body.message}</p>
//     `;

//     /* Start of nodemailer functions*/
//     let transporter = nodemailer.createTransport({
//         host: 'smtp.ethereal.email',
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: 'account.user@example.com', // generated ethereal user
//             pass: 'account.pass' // generated ethereal password
//         },
//         /* tls key needed in order for nodemailer to work from localhost */
//         tls: {
//             rejectUnauthorized: false
//         }
//     });

//     // setup email data with unicode symbols
//     let mailOptions = {
//         from: '"Stack Artisan" <account.user@example.com>', // sender address
//         to: 'ysanne.car@gmail.com', // list of receivers
//         subject: 'Someone contacted you', // Subject line
//         text: 'Hello world?', // plain text body
//         html: output // html body. I'm using the variable I created above
//     };

//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//         // Preview only available when sending through an Ethereal account
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//         // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

//         // 
//         res.render('contact', {msg: 'Email has been sent'});
//     });
//     /* End of nodemailer functions*/

//     console.log(req.body);
// });

// initialises server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});