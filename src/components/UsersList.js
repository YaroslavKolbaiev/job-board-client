import { useUsers } from "../hooks/useUsers";

function UsersList() {
  const { users, loading, error } = useUsers();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }
  return (
    <section className="section">
      <h1 className="title has-text-centered">List of users</h1>
      <div className="columns is-multiline">
        {users.map((user) => (
          <div key={user.id} className="column is-one-third">
            <div style={{ height: "100%" }} className="box">
              <h1 className="title">{user.email}</h1>
              <h2 className="subtitle">employed at {user.company.name}</h2>
              <div className="content">
                {user.jobs.length ? (
                  <ul>
                    {user.jobs.map((userJob) => (
                      <li key={userJob.id}>{userJob.title}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No posted jobs yet</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UsersList;
