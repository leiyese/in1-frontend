import React, { useEffect, useState, useRef, useCallback } from 'react';
import { fetchSubscriptionTypes, createUserSubscription, deleteUserSubscription, getUserSubscription } from '../services/SubscriptionApi';
import { getProtectedData } from '../services/authApi';
import { useNavigate } from 'react-router-dom';
import SubscriptionCard from '../components/SubscriptionCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Subscription.module.css';

const Subscription = () => {
    const [serverMessage, setServerMessage] = useState(null);
    const [subscriptionTypes, setSubscriptionTypes] = useState([]);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);
    const [currentSubscription, setCurrentSubscription] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const navigate = useNavigate();
    const ticking = useRef(false);

    // Optimize fade-in animations
    const handleScroll = useCallback(() => {
        if (!ticking.current) {
            ticking.current = true;
            
            requestAnimationFrame(() => {
                // Add visible class to elements as they enter viewport
                document.querySelectorAll(`.${styles.fadeIn}`).forEach(element => {
                    const elementTop = element.getBoundingClientRect().top;
                    const elementVisible = 150;
                    if (elementTop < window.innerHeight - elementVisible) {
                        element.classList.add(styles.visible);
                    }
                });
                
                ticking.current = false;
            });
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    // Load subscription data
    useEffect(() => {
        const loadSubscriptionTypes = async () => {
            try {
                const data = await fetchSubscriptionTypes();
                setSubscriptionTypes(data.subscriptionTypes || data);
            } catch (error) {
                setServerMessage({
                    type: "error",
                    text: "Failed to load subscription plans"
                });
            }
        };

        const fetchUser = async () => {
            try {
                const userData = await getProtectedData();
                setUserId(userData.logged_in_as);
                setUsername(userData.username);
                
                try {
                    const userSubscription = await getUserSubscription(userData.logged_in_as);
                    if (userSubscription) {
                        setCurrentSubscription(userSubscription);
                        const activePlanId = userSubscription.subscriptions_type_id;
                        setSelectedPlan(activePlanId);
                    }
                } catch (err) {
                    console.error("Error fetching user subscription:", err);
                }
            } catch (error) {
                setServerMessage({
                    type: "warning",
                    text: "Please log in to manage subscriptions"
                });
            }
        };

        loadSubscriptionTypes();
        fetchUser();
    }, []);

    const handleSelectSubscription = async (subscriptionId) => {
        if (!userId) {
            setServerMessage({
                type: "error",
                text: "Please log in to subscribe"
            });
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            return;
        }
        
        try {
            setServerMessage({
                type: "loading",
                text: "Processing your subscription..."
            });
            
            const response = await createUserSubscription(subscriptionId, userId);
            
            setServerMessage({
                type: "success",
                text: "Subscription updated successfully!"
            });
            
            setCurrentSubscription(response);
            setSelectedPlan(subscriptionId);
            
            // Clear success message after 3 seconds
            setTimeout(() => {
                setServerMessage(null);
            }, 3000);
            
        } catch (error) {
            setServerMessage({
                type: "error",
                text: error.response?.data?.error || "There was a problem with your subscription"
            });
        }
    };

    const handleCancelSubscription = async () => {
        if (!currentSubscription) {
            console.error("No current subscription to cancel");
            return;
        }

        console.log("Attempting to cancel subscription:", currentSubscription); // Debug log

        // Make sure we have a valid subscription id
        if (!currentSubscription.id) {
            setServerMessage({
                type: "error",
                text: "Cannot cancel subscription: Missing subscription ID"
            });
            return;
        }

        try {
            const response = await deleteUserSubscription(currentSubscription.id);
            console.log("Cancellation response:", response);
            setServerMessage({
                type: "success",
                text: response.message || "Subscription cancelled successfully."
            });
            setCurrentSubscription(null);
            window.location.reload(); // Reload the page to ensure the subscription ID is cleared
        } catch (error) {
            console.error("Error cancelling subscription:", error);
            setServerMessage({
                type: "error",
                text: error.response?.data?.error || "Failed to cancel subscription."
            });
        }
    };

    return (
        <div className={styles.subscriptionPage}>
            <Header />
            
            {/* Enhanced page header */}
            <div className={styles.enhancedHeader}>
                <div className={styles.headerContent}>
                    <h1 className={styles.pageTitle}>Premium Plans</h1>
                    <p className={styles.pageSubtitle}>Unlock the full potential of AI with our subscription options</p>
                    
                    {userId && (
                        <div className={styles.userInfo}>
                            Welcome, <span className={styles.username}>{username}</span>
                            {currentSubscription && (
                                <div className={styles.currentPlanChip}>
                                    <span className={styles.chipIcon}>✓</span>
                                    <span>
                                        {subscriptionTypes.find(type => 
                                            type.id === currentSubscription.subscriptions_type_id
                                        )?.type || 'Active'} Plan
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                
                <div className={styles.headerDecorator}></div>
            </div>
            
            {/* Status message */}
            {serverMessage && (
                <div className={`${styles.messageContainer} ${styles[serverMessage.type]}`}>
                    {serverMessage.type === 'loading' && (
                        <div className={styles.loadingSpinner}></div>
                    )}
                    <p>{serverMessage.text}</p>
                </div>
            )}
            
            {/* Current subscription status */}
            {currentSubscription && (
                <section className={`${styles.currentSubscriptionSection} ${styles.fadeIn}`}>
                    <div className={styles.container}>
                        <div className={styles.statusCard}>
                            <div className={styles.statusIcon}>✓</div>
                            <div className={styles.statusContent}>
                                <h2>Your Active Subscription</h2>
                                <p>You're currently subscribed to our <strong>{
                                    subscriptionTypes.find(type => type.id === currentSubscription.subscriptions_type_id)?.type || 'Premium'
                                }</strong> plan</p>
                                <button 
                                    className={styles.cancelButton}
                                    onClick={handleCancelSubscription}
                                >
                                    Cancel Subscription
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            
            {/* Plans Section */}
            <section className={`${styles.plansSection} ${styles.fadeIn}`}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Choose Your Plan</h2>
                    <p className={styles.sectionSubtitle}>Select the subscription that meets your needs</p>
                    
                    <div className={styles.plansGrid}>
                        {subscriptionTypes.map((plan) => {
                            const isActive = currentSubscription && 
                                currentSubscription.subscriptions_type_id === plan.id;
                            
                            return (
                                <div 
                                    key={plan.id} 
                                    className={`${styles.planCard} ${isActive ? styles.activePlan : ''}`}
                                    onClick={() => !isActive && handleSelectSubscription(plan.id)}
                                >
                                    <div className={styles.planHeader}>
                                        <h3>{plan.type}</h3>
                                        {isActive && <span className={styles.currentBadge}>Current Plan</span>}
                                    </div>
                                    <div className={styles.planPrice}>
                                        <span className={styles.currency}>$</span>
                                        <span className={styles.amount}>{plan.price}</span>
                                        <span className={styles.period}>/month</span>
                                    </div>
                                    <div className={styles.planFeatures}>
                                        <ul>
                                            <li>Advanced AI Models</li>
                                            <li>Priority Support</li>
                                            <li>Unlimited Messages</li>
                                            {plan.price >= 20 && <li>Custom Training</li>}
                                            {plan.price >= 30 && <li>API Access</li>}
                                        </ul>
                                    </div>
                                    <button 
                                        className={`${styles.planButton} ${isActive ? styles.currentButton : ''}`}
                                        disabled={isActive}
                                    >
                                        {isActive ? 'Current Plan' : 'Subscribe'}
                                    </button>
                                    
                                    {/* Decorative elements */}
                                    <div className={styles.cardDecoration}></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            
            {/* Features section */}
            <section className={`${styles.featuresSection} ${styles.fadeIn}`}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Subscription Benefits</h2>
                    <div className={styles.featuresGrid}>
                        {[
                            { icon: '🚀', title: 'Premium Models', description: 'Access to the most advanced AI models like GPT-4 and Claude 3.7 Sonnet' },
                            { icon: '💬', title: 'Unlimited Chats', description: 'No limits on conversations, generate as much content as you need' },
                            { icon: '⚡', title: 'Priority Processing', description: 'Your requests are processed with the highest priority' },
                            { icon: '🔒', title: 'Enhanced Privacy', description: 'Additional privacy features to protect your sensitive data' }
                        ].map((feature, index) => (
                            <div key={index} className={styles.featureCard}>
                                <div className={styles.featureIcon}>{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* FAQ section */}
            <section className={`${styles.faqSection} ${styles.fadeIn}`}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                        {[
                            { 
                                question: 'How do I change my subscription plan?', 
                                answer: 'You can easily upgrade or downgrade by selecting a different plan on this page. Changes will be applied immediately.' 
                            },
                            { 
                                question: 'Will I be charged immediately?', 
                                answer: 'Yes, your subscription begins as soon as you subscribe. We offer prorated refunds if you decide to cancel.' 
                            },
                            { 
                                question: 'Can I cancel anytime?', 
                                answer: 'Absolutely! You can cancel your subscription at any time with no questions asked or hidden fees.' 
                            },
                            { 
                                question: 'What happens when I cancel?', 
                                answer: 'You\'ll continue to have access to premium features until the end of your current billing period.' 
                            }
                        ].map((faq, index) => (
                            <div key={index} className={styles.faqItem}>
                                <h3>{faq.question}</h3>
                                <p>{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* CTA section */}
            <section className={`${styles.ctaSection} ${styles.fadeIn}`}>
                <div className={styles.ctaContent}>
                    <h2>Ready to upgrade your AI experience?</h2>
                    <p>Choose a plan that suits your needs and start exploring premium features today.</p>
                    <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                        className={styles.ctaButton}
                    >
                        View Plans
                    </button>
                </div>
            </section>
            
            <Footer />
        </div>
    );
};

export default Subscription;