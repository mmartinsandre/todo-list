// Import necessary modules for testing
const request = require('supertest');
const app = require('../app'); // Assuming the Express app is defined in a file named app.js
const Task = require('../models/task');

// Mocking MongoDB for testing
jest.mock('../models/task', () => ({
  find: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

// Test GET endpoint for retrieving all tasks
describe('GET /tasks', () => {
  it('should return all tasks', async () => {
    const tasks = [{ _id: 'task_id_1', title: 'Task 1' }, { _id: 'task_id_2', title: 'Task 2' }]; // Sample tasks
    Task.find.mockResolvedValue(tasks);
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.arrayContaining(tasks));

    // Set the task ID for further tests
    const taskId = response.body[0]._id;

    // Test POST endpoint for creating a new task
    describe('POST /tasks', () => {
      it('should create a new task', async () => {
        const newTask = { title: 'New Task Title' };
        Task.save.mockResolvedValue(newTask);
        const response = await request(app).post('/tasks').send(newTask);
        expect(response.status).toBe(201);
        expect(response.body.title).toBe(newTask.title);
      });
    });

    // Test PATCH endpoint for updating a task
    describe('PATCH /tasks/{id}', () => {
      it('should update a task by ID', async () => {
        const updatedTask = { title: 'Updated Task Title' };
        Task.findById.mockResolvedValue(updatedTask);
        Task.save.mockResolvedValue(updatedTask);
        const response = await request(app).patch(`/tasks/${taskId}`).send(updatedTask);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(updatedTask.title);
      });
    });

    // Test DELETE endpoint for deleting a task
    describe('DELETE /tasks/{id}', () => {
      it('should delete a task by ID', async () => {
        Task.findByIdAndDelete.mockResolvedValue({ message: 'Task deleted' });
        const response = await request(app).delete(`/tasks/${taskId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Task deleted');
      });
    });
  });
});