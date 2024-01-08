import "./Login.css"
const Login = ({ onLogin }) => {
  function handleLogin(e) {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    if (username === "admin" && password === "password") {
      onLogin();
    } else {
      alert(`invalid credentials`);
    }
  }
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <input
          className="login-input"
          name="username"
          type="text"
          placeholder="Username"
        />
        <input
          className="login-input"
          name="password"
          type="password"
          placeholder="Password"
        />
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
