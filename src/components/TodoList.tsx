import React, { useState, useEffect } from 'react';
import PouchDB from 'pouchdb';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
} from '@ionic/react';
import { trash } from 'ionicons/icons';
import './TodoList.css';

interface Todo {
  _id: string;
  text: string;
}

const db = new PouchDB('todos');

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await db.allDocs({ include_docs: true });
      setTodos(result.rows.map(row => row.doc as any));
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (input.trim()) {
      const newTodo: Todo = {
        _id: new Date().toISOString(),
        text: input,
      };
      await db.put(newTodo);
      setTodos([...todos, newTodo]);
      setInput('');
    }
  };

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleDeleteTodo = async (todo: Todo) => {
    try {
      // Fetch the latest version of the document
      const doc = await db.get(todo._id);
      // Remove the document using the latest revision
      await db.remove(doc._id, doc._rev);
      // Update the state
      setTodos(prevTodos => prevTodos.filter(t => t._id !== todo._id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">To-do List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="todo-container">
          <div className="todo-input">
            <IonItem>
              <IonLabel position="floating">New Task</IonLabel>
              <IonInput value={input} onIonChange={handleInputChange} />
            </IonItem>
            <IonButton expand="block" onClick={handleAddTodo}>
              Add To-do
            </IonButton>
          </div>
          <IonList className="todo-list">
            {todos.map((todo) => (
              <IonItem key={todo._id}>
                <IonLabel>{todo.text}</IonLabel>
                <IonButton slot="end" color="danger" onClick={() => handleDeleteTodo(todo)}>
                  <IonIcon icon={trash} />
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TodoList;