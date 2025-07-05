const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const TODOS_FILE = path.join(__dirname, '../todos.json');

/**
 * Read todos from the JSON file
 */
const readTodosFromFile = async () => {
  try {
    const data = await fs.readFile(TODOS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading todos file:', error);
    // Return empty array if file doesn't exist or is corrupted
    return [];
  }
};

/**
 * Write todos to the JSON file
 */
const writeTodosToFile = async (todos) => {
  try {
    await fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 2));
  } catch (error) {
    console.error('Error writing todos file:', error);
    throw new Error('Failed to save todos');
  }
};

/**
 * GET /todos - Retrieve all to-do items
 */
const getAllTodos = async (req, res) => {
  try {
    const todos = await readTodosFromFile();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to retrieve todos',
      message: error.message,
    });
  }
};

/**
 * POST /todos - Add a new to-do item
 */
const createTodo = async (req, res) => {
  try {
    const { text } = req.body;

    // Validation
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'Text is required and must be a non-empty string',
      });
    }

    const todos = await readTodosFromFile();

    const newTodo = {
      id: uuidv4(),
      text: text.trim(),
      completed: false,
    };

    todos.push(newTodo);
    await writeTodosToFile(todos);

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to create todo',
      message: error.message,
    });
  }
};

/**
 * PUT /todos/:id/complete - Toggle the completed status of a task
 */
const toggleTodoComplete = async (req, res) => {
  try {
    const { id } = req.params;
    const todos = await readTodosFromFile();

    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({
        error: 'Todo not found',
        message: `No todo found with id: ${id}`,
      });
    }

    // Toggle the completed status
    todos[todoIndex].completed = !todos[todoIndex].completed;

    await writeTodosToFile(todos);

    res.status(200).json(todos[todoIndex]);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update todo',
      message: error.message,
    });
  }
};

/**
 * DELETE /todos/:id - Delete a task by its id
 */
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todos = await readTodosFromFile();

    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({
        error: 'Todo not found',
        message: `No todo found with id: ${id}`,
      });
    }

    const deletedTodo = todos[todoIndex];
    todos.splice(todoIndex, 1);

    await writeTodosToFile(todos);

    res.status(200).json({
      message: 'Todo deleted successfully',
      deletedTodo,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete todo',
      message: error.message,
    });
  }
};

/**
 * PUT /todos/:id - Update a todo item (bonus endpoint)
 */
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;

    const todos = await readTodosFromFile();
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex === -1) {
      return res.status(404).json({
        error: 'Todo not found',
        message: `No todo found with id: ${id}`,
      });
    }

    // Update fields if provided
    if (text !== undefined) {
      if (typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({
          error: 'Invalid input',
          message: 'Text must be a non-empty string',
        });
      }
      todos[todoIndex].text = text.trim();
    }

    if (completed !== undefined) {
      if (typeof completed !== 'boolean') {
        return res.status(400).json({
          error: 'Invalid input',
          message: 'Completed must be a boolean',
        });
      }
      todos[todoIndex].completed = completed;
    }

    await writeTodosToFile(todos);

    res.status(200).json(todos[todoIndex]);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to update todo',
      message: error.message,
    });
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  toggleTodoComplete,
  deleteTodo,
  updateTodo,
};
