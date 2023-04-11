import { useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteJob } from "../hooks/useDeleteJob";
import { getAccessToken } from "../auth";

function JobList({ jobs }) {
  const [visibleJobs, setVisibleJobs] = useState(jobs);
  const { onDeleteJob } = useDeleteJob();
  const userdata = JSON.parse(getAccessToken());

  async function removeJob(id) {
    const { deleteJob } = await onDeleteJob(id);
    setVisibleJobs((curr) => curr.filter((job) => job.id !== deleteJob.id));
    alert(`Job ${deleteJob.title} was deleted`);
  }

  return (
    <section className="section">
      <h1 className="title has-text-centered">Jobs board</h1>
      <ul className="box">
        {visibleJobs.map((job) => {
          const title = job.company
            ? `${job.title} at ${job.company.name}`
            : job.title;
          return (
            <li key={job.id} className="media">
              <div className="media-content">
                <Link to={`/jobs/${job.id}`}>{title}</Link>
                {userdata?.companyId === job.companyId && (
                  <button
                    onClick={() => {
                      removeJob(job.id);
                    }}
                    className="button is-pulled-right"
                  >
                    x
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default JobList;
