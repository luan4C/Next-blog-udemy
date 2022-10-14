import { useRef, useState } from 'react';
import classes from './profile-form.module.css';

function ProfileForm() {
  const oldPassRef = useRef();
  const newPassRef = useRef();
  const [error, setError] = useState('');
  
  async function handleChangePassword(event){
    event.preventDefault()
    const result = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify({
        newPass: newPassRef.current.value,
        oldPass: oldPassRef.current.value
      }),
      headers: {
        'Content-Type': 'Application/Json'
      }
    })
    const status = result.status;
    const json = await result.json()

    if(status === 401){
      setError(json.message);
    }

  } 
  return (
    <form onSubmit={handleChangePassword} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPassRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPassRef}/>
      </div>
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
      <span style={{color: '#EB3829', fontWeight: 'bold'}}>{error && error}</span>
    </form>
  );
}

export default ProfileForm;
