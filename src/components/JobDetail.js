import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useJob } from "../hooks/useJob";
import { useUpdateJob } from "../hooks/useUpdateJob";

const JobDetailData = ({ job }) => {
  const [visibleJob, setVisibleJob] = useState(job);
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(job.title);
  const [newDescription, setNewDescription] = useState(job.description);
  const { updateJob } = useUpdateJob();

  async function editJob() {
    try {
      const updatedJob = await updateJob(job.id, newTitle, newDescription);
      setEditMode(false);
      setVisibleJob((prev) => {
        const newJob = {
          ...prev,
          title: newTitle,
          description: newDescription,
        };
        return newJob;
      });
      alert(`Job ${updatedJob.title} was updated`);
    } catch (error) {
      alert("You are not authorized to edit current job");
    }
  }
  return (
    <section className="section">
      <h1 className="title">
        <button
          onClick={() => {
            setEditMode(!editMode);
          }}
          className="button mr-3"
        >
          Edit
        </button>
        {editMode && (
          <button onClick={editJob} className="button">
            Update
          </button>
        )}
        {editMode ? (
          <input
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
            className="input"
            type="text"
            value={newTitle}
          />
        ) : (
          visibleJob?.title
        )}
      </h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="box">
        {editMode ? (
          <input
            onChange={(e) => {
              setNewDescription(e.target.value);
            }}
            className="input"
            type="text"
            value={newDescription}
          />
        ) : (
          visibleJob?.description
        )}
      </div>
    </section>
  );
};

function JobDetail() {
  const { jobId } = useParams();
  const { job, loading, error } = useJob(jobId);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div>
      <JobDetailData job={job} />
    </div>
  );
}

export default JobDetail;
