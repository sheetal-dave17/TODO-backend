const {Todo} = require('../models');

// create todo
exports.addTodo = async (req, res) => {
    try {
        const todo = req.body;
        const newTodo = new Todo(todo);

        // save new todo
        const response = await newTodo.save();
        return res.status(201).json(
            {
                status: 'success',
                message: 'Todo item created successfully',
                todo: response
            });
    } catch (error) {
        return res.status(500).json(
            {
                status: 'error',
                error: error,
                message: 'something went wrong'
            });
    }
};

// update todo item
exports.updateTodoItem = async (req, res) => {
    try {
        const todoParams = req.body;
        const id = req.params.id;
        let todo = await Todo.findById(id)
        Object.assign(todo, todoParams);
        // save updated todo
        const response = await todo.save();
        return res.status(200).json(
            {
                status: 'success',
                message: 'Todo item updated successfully',
                todo: response
            });
    } catch (error) {
        return res.status(500).json(
            {
                status: 'error',
                error: error,
                message: 'something went wrong'
            });
    }
};

// get todo item
exports.getTodoItem = async (req, res) => {
    try {
        const id = req.params.id;
        let todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json(
                {
                    status: 'error',
                    message: `Todo with the id [${id}] does not exists`
                });

        }
        return res.status(200).json(todo.toJSON());
    } catch (error) {
        return res.status(500).json(
            {
                status: 'error',
                error: error,
                message: 'something went wrong' });
    }
};

// delete todo item
exports.deleteTodoItem = async (req, res) => {
    try {
        const id = req.params.id;
        await Todo.remove({_id: id});
        return res.status(200).json({status: 'success', message: 'Todo successfully deleted'});
    } catch (error) {
        return res.status(500).json(
            {
                status: 'error',
                error: error,
                message: 'something went wrong'
            });
    }
};

// get all todos
exports.getAllTodo = async (req, res) => {
    try {
       let todos = await Todo.find({});
        if (!todos) {
            return res.status(204).json(
                {
                    status: 'error',
                    message: `There are no todos found`
                });

        }
        return res.status(200).json(todos);
    } catch (error) {
        return res.status(500).json(
            {
                status: 'error',
                error: error,
                message: 'something went wrong' });
    }
};
