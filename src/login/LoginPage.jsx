import React, { useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    // Perform login logic here
    // For example, validate the credentials and navigate to the user profile page if successful
    if (email && password) {
      // Assuming successful login, navigate to the user profile page
      history.push('/UserProfile');
    }
    console.log('Username:', email);
    console.log('Password:', password);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ backgroundColor: 'rgb(87, 13, 19)' }}>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="form-row" style={{ marginBottom: '1rem' }}>
            <IonCol size="12">
              <IonInput
                type="email"
                placeholder="Email"
                value={email}
                onIonChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  '--padding-start': '1rem',
                  '--padding-end': '1rem',
                  '--padding-top': '0.5rem',
                  '--padding-bottom': '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                }}
              />
            </IonCol>
          </IonRow>
          <IonRow className="form-row" style={{ marginBottom: '1rem' }}>
            <IonCol size="12">
              <IonInput
                type="password"
                placeholder="Password"
                value={password}
                onIonChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  '--padding-start': '1rem',
                  '--padding-end': '1rem',
                  '--padding-top': '0.5rem',
                  '--padding-bottom': '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                }}
              />
            </IonCol>
          </IonRow>
          <IonRow className="form-row" style={{ marginBottom: '1rem' }}>
            <IonCol size="12">
              <IonButton
                expand="full"
                onClick={handleLogin}
                style={{
                  '--background': 'rgb(87, 13, 19) !important',
                  '--border-radius': '5px',
                  '--box-shadow': 'none',
                  '--color': 'white',
                }}
              >
                Login
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
