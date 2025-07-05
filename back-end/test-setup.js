const fs = require('fs');
const path = require('path');

// Test script to verify the backend setup
console.log('🧪 Testing Todo Backend Setup...\n');

// Check if all files exist
const requiredFiles = [
  'server.js',
  'package.json',
  'todos.json',
  'controllers/todosController.js',
  'routes/todosRoutes.js',
  'middleware/logger.js',
];

let allFilesExist = true;

requiredFiles.forEach((file) => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log('\n🎉 All required files are present!');
  console.log('\n🚀 To start the server:');
  console.log('   npm run dev   (development with auto-reload)');
  console.log('   npm start     (production)');
  console.log('\n🌐 API will be available at: http://localhost:5000');
  console.log('\n📋 API Endpoints:');
  console.log('   GET    /            - Health check');
  console.log('   GET    /todos       - Get all todos');
  console.log('   POST   /todos       - Create new todo');
  console.log('   PUT    /todos/:id/complete - Toggle completion');
  console.log('   DELETE /todos/:id   - Delete todo');
  console.log('   PUT    /todos/:id   - Update todo');
} else {
  console.log('\n❌ Some files are missing. Please check the setup.');
}
