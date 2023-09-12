import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useCreateJob } from '../hooks/useCreateJobNew.js';

function JobForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { createJob, result } = useCreateJob();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data } = await createJob(title, description);

    console.log('job created', data);
    navigate(`/jobs/${data.job.id}`);
  };

  return (
    <div className="section">
      <h1 className="title">New Job</h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="textarea"
                rows={10}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                className="button is-link"
                disabled={result.loading}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
