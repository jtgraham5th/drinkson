import React from "react";
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  const handleSignup = () => {
    // Perform signup logic here
    // For example, create a new user account and navigate to the user profile page
    if (email && password) {
      // Assuming successful signup, navigate to the user profile page
      history.push("/user-profile");
    }
    console.log('Username:', email);
    console.log('Password:', password);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow className="form-row">
            <IonCol size="12">
              <IonInput
                type="email"
                placeholder="Email"
                value={email}
                onIonChange={(e) => setEmail(e.target.value)}
                required
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow className="form-row">
            <IonCol size="12">
              <IonInput
                type="password"
                placeholder="Password"
                value={password}
                onIonChange={(e) => setPassword(e.target.value)}
                required
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow className="form-row">
            <IonCol size="12">
              <IonButton
                expand="full"
                onClick={handleSignup}
                style={{
                  background: "rgb(87, 13, 19)",
                  borderRadius: "5px",
                  boxShadow: "none",
                  color: "white",
                }}
              >
                Sign Up
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
