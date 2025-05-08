import './App.css';
import Navbarc from './components/navbar';
import Footer from './components/footer';
import { useState } from 'react';
import { Container, Form, Button, ListGroup, Row, Col } from 'react-bootstrap';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Create or update task
  function handleAddOrUpdate() {
    if (task.trim() === '') return;

    if (editIndex !== null) {
      const updated = [...todos];
      updated[editIndex] = task;
      setTodos(updated);
      setEditIndex(null);
    } else {
      setTodos([...todos, task]);
    }

    setTask('');
  }

  // ✅ Prepare task for editing
  function handleEdit(index) {
    setTask(todos[index]);
    setEditIndex(index);
  }

  // ✅ Delete task
  function handleDelete(index) {
    setTodos(todos.filter(function (_, i) {
      return i !== index;
    }));

    if (editIndex === index) {
      setTask('');
      setEditIndex(null);
    }
  }

  // ✅ Read (filtered tasks based on search)
  function getFilteredTodos() {
    return todos.filter(function (todo) {
      return todo.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }

  return (
    <div className="app-container">
      <Navbarc />

      <Container fluid className="main-content">
        <div className="content-wrapper">
          <h2 className="text-center mb-4">📝 Todo List</h2>

          <Row className="mb-3">
            <Col md={8}>
              <Form.Control
                type="text"
                placeholder="Enter a task..."
                value={task}
                onChange={function (e) {
                  setTask(e.target.value);
                }}
              />
            </Col>
            <Col md={4}>
              <Button
                variant={editIndex !== null ? 'warning' : 'primary'}
                onClick={handleAddOrUpdate}
              >
                {editIndex !== null ? 'Update Task' : 'Add Task'}
              </Button>
            </Col>
          </Row>

          <p className="text-muted">Total Tasks: {todos.length}</p>

          <Form.Control
            type="text"
            placeholder="Search tasks..."
            className="mb-3"
            value={searchQuery}
            onChange={function (e) {
              setSearchQuery(e.target.value);
            }}
          />

          <ListGroup>
            {getFilteredTodos().map(function (todo, index) {
              return (
                <ListGroup.Item
                  key={index}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>{index + 1}. {todo}</span>
                  <div>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="me-2"
                      onClick={function () {
                        handleEdit(index);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={function () {
                        handleDelete(index);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      </Container>

      <Footer />
    </div>
  );
}

export default App;
