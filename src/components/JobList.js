import { Link } from 'react-router-dom';
import { deleteJob } from '../graphql/project-queries';

function JobList({ jobs, setJobs }) {
  const onDeleteJob = async (jobId) => {
    await deleteJob(jobId);

    setJobs((prev) => prev.filter((job) => job.id !== jobId));
  };
  return (
    <section className="section">
      <h1 className="title has-text-centered">List of jobs</h1>
      <ul className="box">
        {jobs.map((job) => {
          const title = job.company
            ? `${job.title} at ${job.company.name}`
            : job.title;
          return (
            <li key={job.id} className="media">
              <div className="media-content">
                <Link to={`/jobs/${job.id}`}>{title}</Link>
              </div>
              <button
                onClick={() => {
                  onDeleteJob(job.id);
                }}
                type="button"
                className="button is-danger"
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default JobList;
