import { useEffect, useState } from "react";
import styles from "./contact-form.module.css";
import Notification from '../ui/notification';



function ContactForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState(); //pending | success | erro
  const [requestErrorState, setRequestErrorState] = useState();

  useEffect(()=>{
    if(requestStatus === 'success' || requestStatus === 'error'){
      const timeout = setTimeout(()=>{
        setRequestStatus(null)
        setRequestErrorState(null)
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [requestStatus])


  async function sendContactData(contactDetails){
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify(contactDetails),
    });
    const data = await response.json();

    if(!response.ok){
      throw new Error(data.message || 'Something went wrong!')
    }
  }
  async function sendMessageHandler(event) {
    event.preventDefault();
    setRequestStatus('pending');
    try{
      await sendContactData({email,name,message})
      setRequestStatus('success')
      setEmail('')
      setName('')
      setMessage('')
    }catch(err){
      setRequestStatus('error')
      setRequestErrorState(err.message);
    }
  }

  let notification;
  
  if(requestStatus === 'pending'){
    notification ={
      status: 'pending',
      title: 'sending message...',
      message: 'your message is on its way'
    }
  }
  else if(requestStatus === 'success'){
    notification ={
      status: 'success',
      title: 'success',
      message: 'success on store your message'
    }
  }
  else if(requestStatus === 'error'){
    notification ={
      status: 'error',
      title: 'something went wrong...',
      message: requestErrorState
    }
  }

  return (
    <section className={styles.contact}>
      <h1>How can I help you?</h1>
      <form className={styles.form} onSubmit={sendMessageHandler}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="email">Your Email</label>
            <input onChange={event => setEmail(event.target.value)} value={email} type="email" id="email" required />
          </div>
          <div className={styles.control}>
            <label htmlFor="name">Your Name</label>
            <input onChange={event=>setName(event.target.value)} value={name} type="name" id="name" required />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor="message">Your message</label>
          <textarea onChange={event=>setMessage(event.target.value)} value={message} id="message" rows="5" required />
        </div>
        <button>Send</button>
      </form>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} /> }
    </section>
  );
}

export default ContactForm;
