import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import TodoList from '../components/TodoList';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class='ion-text-center'>Inbox</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class='ion-padding'>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inbox</IonTitle>
          </IonToolbar>
        </IonHeader>

        <TodoList />
        
        
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
