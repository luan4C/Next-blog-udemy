import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { useSession } from 'next-auth/client'
// import {getSession} from 'next-auth/client';
// import { useEffect, useState } from 'react';

function UserProfile() {
  // Redirect away if NOT auth
  // const [isLoading, setIsLoading] = useState(true);
  // const [loadedSession, setLoadedSession] = useState();
  
  // useEffect(()=>{
  //   getSession().then(session => {
  //     if(!session){
  //       window.location.href = '/auth'
  //     }else{
  //       setLoadedSession(session);
  //       setIsLoading(false);
  //     }
  //   })
  // },[])

  // if(isLoading){
  //   return <p className={classes.profile}>loading...</p>
  // }
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;