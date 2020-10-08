Amazon site clone 

Youtube link : https://www.youtube.com/watch?v=U55XCQNCdcE&list=RDCMUC2xRE4hUCQ3xO3ymEtMh1Hw&index=2


Until now :

1. The products json in data.js is used in  index.js via  the HomeScreen.js

2. renders html in javascript in HomeScreen.js

3. The product page gets loaded when clicked . done with url parsing. Intelligent work. (see app.js and utils.js)

4. product data know loaded from the server using fetch 'localhost:3000/api/products'   rounter function in app.js made async so is the Homescree.js 


5. Webpack added. the work of webpack is it merge many js files into one : "main.js"(automatically created and used) also 
6. we are using axios.js here replacing fetch() for http requests. Replace fetch with axios
 <!-- Axios is a Javascript library used to make http requests from node.js or XMLHttpRequests from the browser and it supports the Promise API that is native to JS ES6. Another feature that it has over .fetch() is that it performs automatic transforms of JSON data.
If you use .fetch() there is a two-step process when handing JSON data. The first is to make the actual request and then the second is to call the .json() method on the response -->


7. A .Use of babel ( for converting server side ES5 compatible to ES6 syntax . Hence in server.js change require to import from)

7. B. enable code lint. (eslint)
<!--Linting is the automated checking of your source code for programmatic and stylistic errors. This is done by using a lint tool (otherwise known as linter). A lint tool is a basic static code analyzer. -->

8. Star ratings added see the ratings.js

#this Component: 
9. Product UI