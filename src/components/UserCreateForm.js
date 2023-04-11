import { useState } from "react";
import { useNavigate } from "react-router";
import { useCreateUser } from "../hooks/useCreateUser.js";

function JobForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { createUser, loading } = useCreateUser();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = await createUser(email, password);

    alert(`User was created`);
    navigate("/");
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "500px" }}>
        <h1 className="title">SIgn Up</h1>
        <div className="box">
          <form>
            <div className="field">
              <label className="label">email</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button
                  className="button is-link"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default JobForm;
