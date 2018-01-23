const webpack = require('webpack');
const middleware =  require('webpack-dev-middleware');
const hot = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const express = require('express');
const config = require('./webpack.config');
//const dummay = require('./data/controller');

//const router = express.Router();
const compile = webpack(config);
const app = express();

//dummay(router);

app.use(middleware(compile, {
    publicPath: '/'
}));

app.use(bodyParser.urlencoded({
	extended: false
}))

app.use(bodyParser.json());

app.use(hot(compile));
/*app.use((req, res, next) => {
	return router(req, res);
	//next()
})*/
app.use(express.static('/'));
/*app.get('/', (req, res, next) => {
    console.log('-----');
    res.send('hello');
});*/

app.listen(3005, () => {
    console.log('-- serve have start on 3005 port');
});