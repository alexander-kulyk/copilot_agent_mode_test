const express = require('express');
const router = express.Router();
const {
  getAllTodos,
  createTodo,
  toggleTodoComplete,
  deleteTodo,
  updateTodo,
} = require('../controllers/todosController');

/**
 * @route   GET /todos
 * @desc    Get all todos
 * @access  Public
 */
router.get('/', getAllTodos);

/**
 * @route   POST /todos
 * @desc    Create a new todo
 * @access  Public
 */
router.post('/', createTodo);

/**
 * @route   PUT /todos/:id/complete
 * @desc    Toggle todo completion status
 * @access  Public
 */
router.put('/:id/complete', toggleTodoComplete);

/**
 * @route   DELETE /todos/:id
 * @desc    Delete a todo
 * @access  Public
 */
router.delete('/:id', deleteTodo);

/**
 * @route   PUT /todos/:id
 * @desc    Update a todo (bonus endpoint)
 * @access  Public
 */
router.put('/:id', updateTodo);

module.exports = router;
