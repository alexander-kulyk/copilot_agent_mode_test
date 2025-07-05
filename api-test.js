// Test script to verify backend API is working
// Run this in the browser console when both servers are running

const testAPI = async () => {
  const API_BASE = 'http://localhost:5000';

  try {
    console.log('Testing backend API...');

    // Test 1: Get all todos
    const response = await fetch(`${API_BASE}/todos`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const todos = await response.json();
    console.log('✅ GET /todos - Success:', todos);

    // Test 2: Create a new todo
    const createResponse = await fetch(`${API_BASE}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Test todo from API' }),
    });

    if (!createResponse.ok) {
      throw new Error(
        `HTTP ${createResponse.status}: ${createResponse.statusText}`
      );
    }
    const newTodo = await createResponse.json();
    console.log('✅ POST /todos - Success:', newTodo);

    // Test 3: Toggle completion
    const toggleResponse = await fetch(
      `${API_BASE}/todos/${newTodo.id}/complete`,
      {
        method: 'PUT',
      }
    );

    if (!toggleResponse.ok) {
      throw new Error(
        `HTTP ${toggleResponse.status}: ${toggleResponse.statusText}`
      );
    }
    const toggledTodo = await toggleResponse.json();
    console.log('✅ PUT /todos/:id/complete - Success:', toggledTodo);

    // Test 4: Delete todo
    const deleteResponse = await fetch(`${API_BASE}/todos/${newTodo.id}`, {
      method: 'DELETE',
    });

    if (!deleteResponse.ok) {
      throw new Error(
        `HTTP ${deleteResponse.status}: ${deleteResponse.statusText}`
      );
    }
    console.log('✅ DELETE /todos/:id - Success');

    console.log('🎉 All API tests passed! Backend is working correctly.');
  } catch (error) {
    console.error('❌ API test failed:', error);
    console.log(
      'Make sure the backend server is running on http://localhost:5000'
    );
  }
};

// Run the test
testAPI();
