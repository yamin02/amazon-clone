Amazon site clone 

Youtube link : https://www.youtube.com/watch?v=U55XCQNCdcE&list=RDCMUC2xRE4hUCQ3xO3ymEtMh1Hw&index=2


Until now :

1. The products json in data.js is used in  index.js via  the HomeScreen.js

2. renders html in javascript in HomeScreen.js

  3. The product page gets loaded when clicked . done with url parsing. Intelligent work. (see app.js and utils.js)

this commit: 4. product data know loaded from the server using fetch 'localhost:3000/api/products'  
rounter function in app.js made async so is the Homescree.js 