# People API Express Challenge

Your task is to create a new express server that meets the requirements of the task. At the moment, focus on the API, and we will work on the front end once the API is working. That way when you build you build the front end, you know exactly how the data is going to be returned.

## Task
Using the people.json file in this repo, create a server with an endpoint that accepts a parameter for a country


Reminder, this is what an endpoint looks like:
```
app.get("/endpoint/:param", (req,res)=>{})
```

Each endpoint should return an array of all the items in the chosen country.

Feel free to add people to the json file, so long as they follow the same structure.

## Strech goal
Create an endpoint that takes TWO parameters, the first being the item in the object (name, age, country) and the other being a search term.

This should return a list of matching items, just as the main task did.

## Super stretch goal
Find a way to include hobbies in the stretch goal search.
