# texter

Displays text character by character

## preview 

![preview](https://raw.githubusercontent.com/nickhalvorsen/texter/master/demo.gif)

## usage

**html**
``` 
    <div id="myDiv"></div>
    <script src="texter.js"></script>
```

**js**
```
    var texter = new Texter('myDiv')
    texter.display('wow this is a very good library', 100)
```

**callback**
```
    var texter = new Texter('myDiv')
    var callback = function() { console.log('callback')}
    texter.display('wow this is a very good library', 100, callback)
```

**display html**
```
    var texter = new Texter('myDiv')
    texter.display('wow this is a <span style="font-style:italic;">very good</span> library', 100)
```