import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import LinkButton from '../components/LinkButton';
import TextInput from '../components/TextInput';
import { getProtectedData } from '../services/authApi';
import { getProfile, updateProfile } from '../services/userApi';
import { getUserSubscription, fetchSubscriptionTypes } from '../services/SubscriptionApi'; // Add this import
import styles from '../styles/ProfilePage.module.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const [serverMessage, setServerMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null); // Add this state
  const [subscriptionTypes, setSubscriptionTypes] = useState([]); // Add this state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching user data..."); // Debug-utskrift
        const userData = await getProtectedData();
        console.log("User data received:", userData); // Debug-utskrift
        setUserId(userData.logged_in_as);
        
        if (userData.logged_in_as) {
          console.log("Fetching profile data for user:", userData.logged_in_as); // Debug-utskrift
          const profileData = await getProfile(userData.logged_in_as);
          console.log("Profile data received:", profileData); // Debug-utskrift
          
          // Get subscription types first
          const types = await fetchSubscriptionTypes();
          setSubscriptionTypes(types.subscriptionTypes || types);
          
          // Then get user's subscription
          try {
            const subscription = await getUserSubscription(userData.logged_in_as);
            setSubscriptionData(subscription);
            console.log("User subscription data:", subscription);
            
            // Find the subscription type name
            let subscriptionInfo = "No active subscription";
            if (subscription) {
              const subType = types.subscriptionTypes?.find(type => 
                type.id === subscription.subscriptions_type_id
              )?.type || 'Premium';
              subscriptionInfo = `${subType} Plan`;
            }
            
            setValue('subscriptionType', subscriptionInfo);
          } catch (subError) {
            console.log("No subscription found or error:", subError);
            setValue('subscriptionType', "No active subscription");
          }
          
          if (profileData) {
            setValue('username', profileData.username || '');
            setValue('email', profileData.email || '');
            setValue('subscription', profileData.subscription_id || 'No active subscription');
            setProfileData(profileData);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response?.status === 401) {
          // Om användaren inte är inloggad, omdirigera till inloggningssidan
          navigate('/login');
        } else {
          setServerMessage({ type: "error", text: "Failed to load profile data" });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [setValue, navigate]);

  const onSubmit = async (formData) => {
    try {
      if (!formData.username || !formData.email) {
        setServerMessage({ type: "error", text: "Both username and email are required" });
        return;
      }

      // Kontrollera om något faktiskt har ändrats
      if (formData.username === profileData.username && formData.email === profileData.email) {
        setServerMessage({ type: "info", text: "No changes detected" });
        setIsEditing(false);
        return;
      }

      const updateData = {
        username: formData.username.trim(),
        email: formData.email.trim()
      };

      console.log("Sending update data:", updateData);
      console.log("User ID:", userId);

      const response = await updateProfile(userId, updateData);
      console.log("Update response:", response);
      
      if (response.Error) {
        setServerMessage({ type: "error", text: response.Error });
      } else {
        setServerMessage({ type: "success", text: "Profile updated successfully!" });
        setIsEditing(false);
        reset(formData);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      console.log("Error details:", {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });
      
      const errorMessage = error.response?.data?.Error || "Failed to update profile";
      
      if (error.response?.status === 401) {
        navigate('/login');
      } else {
        setServerMessage({ 
          type: "error", 
          text: errorMessage
        });
      }
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault(); // Förhindra standardbeteende
    console.log("Edit button clicked, current isEditing state:", isEditing);
    setIsEditing(true);
    setServerMessage("");
    console.log("New isEditing state:", true);
  };

  const handleCancelEdit = (e) => {
    e.preventDefault(); // Förhindra standardbeteende
    console.log("Cancel button clicked");
    setIsEditing(false);
    reset();
    setServerMessage("");
  };

  // Lägg till en useEffect för att övervaka isEditing
  useEffect(() => {
    console.log("isEditing state changed to:", isEditing);
  }, [isEditing]);

  // Lägg till en useEffect för att hantera formData
  useEffect(() => {
    if (profileData) {
      reset({
        username: profileData.username,
        email: profileData.email
      });
    }
  }, [profileData, reset]);

  return (
    <div className={styles.profilePageLayout}>
      <div className={styles.formContainer}>
        <h2>{isEditing ? "Edit Profile" : "View Profile"}</h2>

        {isLoading && <p className={styles.loadingMessage}>Loading profile...</p>}

        {serverMessage && !isLoading && (
          <p className={`${styles.serverMessage} ${styles[serverMessage.type]}`}>
            {serverMessage.text}
          </p>
        )}

        {!isLoading && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              name="username"
              label="Username"
              register={register}
              registerOptions={{ required: "Username is required" }}
              error={errors.username}
              disabled={!isEditing}
              autoComplete="username"
            />

            <TextInput
              name="email"
              label="Email"
              type="email"
              register={register}
              registerOptions={{ 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              }}
              error={errors.email}
              disabled={!isEditing}
              autoComplete="email"
            />

            {/* Updated subscription field with better display and manage button */}
            <div className={styles.subscriptionField}>
              <TextInput
                name="subscriptionType"
                label="Subscription Status"
                register={register}
                error={errors.subscriptionType}
                disabled={true}
              />
              
              {/* Add a button to manage subscription */}
              <Button 
                type="button" 
                variant="secondary"
                onClick={() => navigate('/subscription')}
                className={styles.manageSubscriptionBtn}
              >
                {subscriptionData ? "Manage Plan" : "Get Subscription"}
              </Button>
            </div>

            <div className={styles.buttonGroup}>
              {isEditing ? (
                <>
                  <Button type="submit">Update Profile</Button>
                  <Button type="button" onClick={handleCancelEdit} variant="secondary">
                    Cancel
                  </Button>
                </>
              ) : (
                <Button type="button" onClick={handleEditClick}>
                  Edit Profile
                </Button>
              )}
            </div>
          </form>
        )}

        <div className={styles.linkButtonContainer}>
          <LinkButton to='/'>Main Menu</LinkButton>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;