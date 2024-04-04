import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../src/app/page'

import '@testing-library/jest-dom';
import { toHaveValue } from '@testing-library/jest-dom/matchers';
expect.extend({ toHaveValue });


describe('Home Page', () => {
  test('renders todo list title', () => {
    render(<Home />);
    const titleElement = screen.getByText(/To-do List/i);
    expect(titleElement).toBeTruthy();
  });

  test('adds a new task', () => {
    render(<Home />);
    const inputElement = screen.getByPlaceholderText('Name of task');
    const addButton = screen.getByRole('button', { name: /add task/i });

    fireEvent.change(inputElement, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    expect(inputElement).toHaveValue('');
    expect(screen.getByText('New Task')).toBeTruthy();
  });

  test('deletes a task', () => {
    render(<Home />);
    const deleteButton = screen.getByRole('button', { name: /delete task/i });

    fireEvent.click(deleteButton);

    expect(screen.queryByText('Task to delete')).toBeFalsy();
  });

  test('edits a task', () => {
    render(<Home />);
    const editButton = screen.getByRole('button', { name: /edit task/i });
    const saveButton = screen.getByRole('button', { name: /save task/i });

    fireEvent.click(editButton);
    const editedTaskInput = screen.getByPlaceholderText('Edit task title');
    fireEvent.change(editedTaskInput, { target: { value: 'Edited Task' } });
    fireEvent.click(saveButton);

    expect(screen.getByText('Edited Task')).toBeTruthy();
  });
});