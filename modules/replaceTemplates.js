// exports this anonymous function as replaceTemplate module for reusability
module.exports = (temp, product) => {
    // regular expression with the 'g' flag represents all the placeholders with the same name in the template
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName); 
    // the reason we're keep using the local variable is that, it's a bad practice to directly update the function arguments
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    // conditional replacement of organic or non organic state of the product 
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic'); 

    return output;
}

