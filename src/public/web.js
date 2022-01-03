const express = require('express');
const app = express();

app.set('view engine', 'ejs')

app.set('views', './src/public/pages')
app.use('/static', express.static('./src/public/static'))

app.use('/', require('./routes/main'))

app.use((req, res, next) => {
    if (req.path.startsWith("/static")) return next();
    next();
});


app.listen(3003)