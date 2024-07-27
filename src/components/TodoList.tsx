import React, { useState } from 'react';
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
import {trash} from 'ionicons/icons';
import './TodoList.css';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const handleAddTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput('');
    }
  };

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleDeleteTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>To-do List</IonTitle>
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
            {todos.map((todo, index) => (
              <IonItem key={index}>
                <IonLabel>{todo}</IonLabel>
                <IonButton slot="end" color="danger" onClick={() => handleDeleteTodo(index)}>
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