import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import LinkButton from '../components/LinkButton';
import TextInput from '../components/TextInput';
import { getProfile, updateProfile } from '../services/userApi';  // Adjusted Import
import { AuthContext } from '../context/AuthContext';   //Context används till profile
import styles from '../styles/ProfilePage.module.css';

const ProfilePage = () => {
  const { user, token } = useContext(AuthContext);  // get User, Token från context
  const { register, handleSubmit, setValue, reset, formState: { errors },} = useForm();
  const [serverMessage, setServerMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Add editing state


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile(token);
          //set profile default data om de inte ger ett error, den ska även uppdatera sig då
          if (profileData) {
          Object.keys(profileData).forEach(key => {
            setValue(key, profileData[key]);  // Prefill with backend Data
          });
        }

      } catch (error) {
        setServerMessage({ type: "error", text: error.response?.data?.error || "Failed to load profile!" });
      }
    };

    if (token) {
      fetchProfile(); //hämtar profilen när komponenten mounter med jwt
    } else {
      console.log("Hittade ej din jwt.")
    }
  }, [token, setValue]);


  const onSubmit = async (data) => {
    try {
        //uppdatera med userapi
      const response = await updateProfile(data, token);
      setServerMessage({ type: "success", text: response.message });
        //När backenden är updaterad är allting uppdaterad
      setIsEditing(false);//Slå av redigeringen efter updateringen
      reset()
    } catch (error) {
      setServerMessage({ type: "error", text: error.response?.data?.error || "Failed to update profile!" });
    }
  };

  return (
    <div className={styles.formContainer}>
        {/* Visa om edit eller icke beroende */}
      <h2>{isEditing ? "Edit Profile" : "View Profile"}</h2>
      {serverMessage && (
        <p className={styles.serverMessage}
           style={{ color: serverMessage.type === "success" ? "green" : "red" }}
        >
          {serverMessage.text}
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          name="username"
          label="Username"
          register={register}
          registerOptions={{ required: "Username is required" }}
          error={errors.username}
          disabled={!isEditing}  // Input is only interactive i EDITMODE
        />
        <TextInput
          name="email"
          label="Email"
          register={register}
          registerOptions={{ required: "Email is required" }}
          error={errors.email}
          disabled={!isEditing} // Can make epost non ändrings bar som i register
        />
        <TextInput
          name="subscription"
          label="Subscription"
          register={register}
          registerOptions={{ required: "Subscription is required" }}
          error={errors.subscription}
          disabled={!isEditing} //Can vara ändrings bar eller icke.
        />

           {/* Toggle mellan knapp visningar beroende på editing mode */}
        {isEditing ? (
          <Button type="submit">Update Profile</Button>
        ) : (
          <Button type="button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </form>
       {/* gå tillbaka till main page, eller till subcsription
    kan även byta det efter önske mål!*/}
      <LinkButton to='/'>Main Menu</LinkButton>
    </div>
  );
};

export default ProfilePage;

