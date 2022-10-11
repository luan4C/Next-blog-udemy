import { useState } from "react";
import classes from "./auth-form.module.css";
import { signIn } from 'next-auth/client'
import { useRouter } from "next/router";

async function createUser(email, password){
  try{
    return fetch("/api/auth/signup", {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "Application/Json",
      },
    });
  }catch(err){
    throw new Error(err.message);
  }
} 

function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }
  async function submitHandler(event) {
    event.preventDefault();
    if (!isLogin) {
      try {
        const result = await createUser(email, password); 
      } catch (error) {
        console.log(error.message)
      }
    }else{
      const result = await signIn('credentials', {
        redirect:false,
        email:email,
        password:password
      })
      if(!result.error){
        router.replace('/')
      }
    }
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="submit"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
