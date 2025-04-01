import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// Importerade komponenter
import Button from '../components/Button';
import LinkButton from '../components/LinkButton';
import TextInput from '../components/TextInput';
// Importera Header/Footer/SideBar här om de ska användas direkt i denna fil
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import SideBar from '../components/SideBar';

// Importerade services
import { getProfile, updateProfile } from '../services/userApi'; // Använder cookie-baserad auth

// Importerade stilar
import styles from '../styles/ProfilePage.module.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, reset, formState: { errors }, } = useForm();
  const [serverMessage, setServerMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State för att visa laddningsindikator

  // --- Effekt för att hämta profildata vid sidladdning ---
  useEffect(() => {
    setIsLoading(true); // Börja ladda
    setServerMessage(""); // Rensa gamla meddelanden

    const fetchProfile = async () => {
      try {
        // Anropa getProfile - förväntar sig att identifiera användaren via cookie
        const profileData = await getProfile();

        if (profileData) {
          // Fyll i formuläret med hämtad data
          // Viktigt: Se till att nycklarna i profileData matchar 'name' i TextInput
          setValue('username', profileData.username || ''); // Sätt username
          setValue('email', profileData.email || '');    // Sätt email
          // Antag att profileData innehåller en läsbar prenumerationsstatus, t.ex. profileData.subscription_status eller profileData.subscription_name
          // Anpassa 'profileData.subscription_status' till det faktiska fältnamnet från ditt API
          setValue('subscription', profileData.subscription_status || 'No active subscription'); // Sätt prenumerationsstatus

        } else {
           setServerMessage({ type: "warning", text: "Profile data not found or empty." });
        }

      } catch (error) {
        console.error("ProfilePage: Failed to fetch profile:", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          setServerMessage({ type: "error", text: "You are not authorized to view this page. Please log in." });
           // Omdirigera till login om användaren inte är auktoriserad
           setTimeout(() => navigate('/login'), 2500);
        } else {
          setServerMessage({ type: "error", text: error.response?.data?.error || "Failed to load profile!" });
        }
      } finally {
          setIsLoading(false); // Sluta ladda oavsett resultat
      }
    };

    fetchProfile();

    // Körs när setValue och navigate är redo.
  }, [setValue, navigate]);

  // --- Funktion för att hantera formulärinskickning (uppdatering) ---
  const onSubmit = async (formData) => {
     // Skicka endast de fält som faktiskt ska uppdateras (troligen bara username)
     // Skapa ett nytt objekt med endast de redigerbara fälten
     const updateData = {
        username: formData.username
        // Lägg till andra redigerbara fält här om det finns
     };

    try {
      // Anropa updateProfile med de data som ska ändras
      const response = await updateProfile(updateData);
      setServerMessage({ type: "success", text: response.message || "Profile updated successfully!" });
      setIsEditing(false); // Stäng redigeringsläget

      // Återställ formuläret med de data som nu är sparade (från formData)
      // Detta uppdaterar visningen om användarnamnet ändrades
      reset(formData);

    } catch (error) {
      console.error("ProfilePage: Failed to update profile:", error);
       if (error.response?.status === 401 || error.response?.status === 403) {
        setServerMessage({ type: "error", text: "Your session may have expired. Please log in again to update your profile." });
        setTimeout(() => navigate('/login'), 2500);
      } else {
        setServerMessage({ type: "error", text: error.response?.data?.error || "Failed to update profile!" });
      }
    }
  };

  // --- Funktion för att avbryta redigering ---
  const handleCancelEdit = () => {
      setIsEditing(false);
      // Återställ formuläret till de ursprungligen laddade värdena.
      // reset() utan argument återställer till de värden som sattes med setValue i useEffect.
      reset();
      setServerMessage(""); // Rensa eventuella felmeddelanden från redigeringen
  }

  // --- JSX för att rendera sidan ---
  return (
    // Lägg till Header, Footer, SideBar och profilePageLayout-div här om de önskas
    // <Header />
    // <div className={styles.profilePageLayout}>
    //   <SideBar onModelSelect={(id) => console.log("Model selected:", id)} />

      <div className={styles.formContainer}>
        <h2>{isEditing ? "Edit Profile" : "View Profile"}</h2>

        {/* Visa laddningsindikator */}
        {isLoading && <p>Loading profile...</p>}

        {/* Visa servermeddelande */}
        {serverMessage && !isLoading && ( // Visa bara om inte laddar
          <p
            className={styles.serverMessage}
            style={{ color: serverMessage.type === "success" ? "green" : serverMessage.type === "warning" ? "orange" : "red" }}
          >
            {serverMessage.text}
          </p>
        )}

        {/* Visa formuläret endast när laddning är klar och inga kritiska fel uppstått initialt */}
        {!isLoading && !(serverMessage.type === "error" && serverMessage.text.includes("authorized")) && (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Användarnamn (redigerbart) */}
            <TextInput
              name="username"
              label="Username"
              register={register}
              registerOptions={{ required: "Username is required" }}
              error={errors.username}
              disabled={!isEditing} // Endast aktiv i redigeringsläge
              autoComplete="username" // Hjälper webbläsare med autofyll
            />
            {/* E-post (inte redigerbart) */}
            <TextInput
              name="email"
              label="Email"
              type="email"
              register={register}
              // Ingen validering behövs om fältet är disabled
              error={errors.email}
              disabled={true} // Inte redigerbart
              autoComplete="email"
            />
            {/* Prenumeration (inte redigerbart) */}
            <TextInput
              name="subscription" // Ska matcha nyckeln satt av setValue
              label="Subscription Status" // Tydligare label
              register={register}
              error={errors.subscription}
              disabled={true} // Inte redigerbart
            />

            {/* Knappar */}
            <div className={styles.buttonGroup}>
              {isEditing ? (
                <>
                  <Button type="submit">Update Profile</Button>
                  <Button type="button" onClick={handleCancelEdit} variant="secondary">
                    Cancel
                  </Button>
                </>
              ) : (
                <Button type="button" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          </form>
        )}

         {/* Länk till huvudsida (visas alltid) */}
         <div className={styles.linkButtonContainer}>
          <LinkButton to='/'>Main Menu</LinkButton>
        </div>
      </div>

    // </div> // Stäng layout-div
    // <Footer />
  );
};

export default ProfilePage;