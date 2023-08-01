const fs = require('fs'); 
const http = require('http');
const url = require('url');
const replaceTemplates = require('./modules/replaceTemplates'); // import our created module

// top-level code
const data = fs.readFileSync(`${__dirname}/dev_data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

// create a server
const server = http.createServer((req, res) => {
    // parse out the request url and extract the query object and  pathname from the url object
    const {query, pathname} = url.parse(req.url, true); 

    // routing
    // Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'});
        // join the output array as a string to respond back
        const cards = dataObj.map(element => replaceTemplates(tempCard, element)).join(''); 
        // replace the placeholder of the overview page with stringified data
        const output = tempOverview.replace('{%PRODUCT_CARD%}', cards);
        res.end(output);
    
    // Product page
    } else if (pathname === '/product') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query.id]; // store the product of query.id index in the dataObj array
        // replace the placeholders of tempProduct with extracted product from the dataObj
        const output = replaceTemplates(tempProduct, product); 
        res.end(output);

    // API
    } else if (pathname === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data); // send back the top-level code without reading again and again to enhance performance
    } else {
        res.writeHead(404, {'Content-type': 'text/html'});
        res.end("<h1>404. This page could not be reached.</h1>");
    }
});

// listen the created server from localhost (127.0.0.1) of port number 8000
server.listen(8000, '127.0.0.1', () => {
    console.log('Server listening at port 8000...');
})


