# isomorphicfetch-must-know
This is a collection about the confusing use of `fetch`.

#### Install 

To use `isomorphic-fetch`
```
$ npm install --save isomorphic-fetch es6-promise
```

To use `express`, providing API for testing `fetch`
```
$ npm install --save express
```

To use `mocha`, unit test
```
$ npm install --save-dev mocha
```

#### Run 
```
$ npm run test
```
## Understanding 

#### API provider
I would like to test the scenario below:
 - Request with 200 status and text response
 - Request with 400 Error status and text response
 - Request with 200 status and json response
 - Request with 400 Error status and json response
 - Incorrect type handling text and json ( `fetch.text()` / `fetch.json()` )
 - Request lasts 5s long (to see how it handles timeout)

<img width="458" alt="screen shot 2017-04-20 at 10 17 36 am" src="https://cloud.githubusercontent.com/assets/5538753/25210483/a2d82076-25b2-11e7-98ee-640f0c22c95f.png">


#### Summary
Those are the unexpected behavior of fetch() function:

 1. response.text() is able to parse a json response
```js
fetch('localhost:3000/json').then(function(response) {
    // paring json response as response.text()
    return response.text();
}).then(function(resultJson) {
    // resultJson is a string
});
```

 2. response.json() is not able to parse a text response
```js
fetch('localhost:3000/send').then(function(response) {
    // paring text response as response.json()
    // throw execption
    return response.json();
})

```

 3. fetch
 `fetch()` does not support timeout handling, the walk around way is creating a [timeoutPromise wrapper](https://github.com/matthew-andrews/isomorphic-fetch/issues/48) by ourself.

```js
fetch('localhost:3000/send').then(function(response) {
    // wait until we die ....
    return response.json();
})

```




## Reference
[https://github.com/matthew-andrews/isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)

