import { IonChip, IonAvatar, IonLabel } from "@ionic/react";
import { UserStore } from "../store";
import { getUser } from "../store/Selectors";

const UserAvatar = ({ userID }) => {
  const user = UserStore.useState(getUser(userID));

  return (
    <IonChip>
      <IonAvatar>
        <img src={user.image} alt={`${user.name}`} />
      </IonAvatar>
      <IonLabel>{user.name}</IonLabel>
    </IonChip>
  );
};
export default UserAvatar;
