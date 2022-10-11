import { useRef } from 'react';
import classes from './profile-form.module.css';

function ProfileForm() {
  const oldPassRef = useRef();
  const newPassRef = useRef();
  
  async function handleChangePassword(event){
    event.preventDefault()
    await fetch('/api/user/change-password', {
      method: 'PUT',
      body: {
        newPass: newPassRef.current.value,
        oldPass: oldPassRef.current.value
      },
      headers: {
        'content-type': 'application/json'
      }
    })
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
    </form>
  );
}

export default ProfileForm;
