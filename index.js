const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

var items = ['buy food', 'cook food', 'eat food'];
let workItems = [];

app.get("/", function(req, res) {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  day = today.toLocaleDateString('en-US', options)
  res.render("list", {
    listTitle: day,
    newlistitems: items
  });

});

app.post("/", function(req, res) {
  var item = req.body.item;
  if (req.body.list === "Work List") {
    workItems.push(item)
    res.redirect('/work')
  } else {
    items.push(item);
    res.redirect("/");
  }
})


app.get('/work', function(req, res) {

  res.render('list', {
    listTitle: "Work List",
    newlistitems: workItems

  })
})

app.get('/about', function(req, res){
  res.render("about")
})

app.post("/work", function(req, res) {
  let item = req.body.item;
  workItems.push(item);
  res.redirect('/work')
})

app.listen(3000, function() {
  console.log("server started at 3000")
});
