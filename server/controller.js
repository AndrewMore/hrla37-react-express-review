const todos = ['Pass the TA', 'Celebrate passing the TA', 'Don\'t get coronavirus'];
const controller = {
  get : (req, res) => {
    res.status(200).send(todos)
  },
  post : (req, res) => {
    console.log(req.body);
    let {todo} = req.body;
    todos.push(todo);
    res.status(201).send('Posted the item. Successful post');
  },
  delete : (req, res) => {
    let index = req.params.index; //let {index} = req.params
    let deleted = todos.splice(index, 1);
    res.status(202).send(`Deleted todo ${deleted}`);
  }

}

module.exports = controller;