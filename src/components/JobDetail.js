import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useJob } from '../hooks/useJob';
import {
  // getJob,
  updateJob,
} from '../graphql/project-queries';

function JobDetail() {
  const [job, setJob] = useState();
  const { jobId } = useParams();
  const [isEdditrMode, setIsEdditMode] = useState(false);
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');

  const { jobDelail, loading, error } = useJob(jobId);

  useEffect(() => {
    // getJob(jobId).then(setJob);
    setJob(jobDelail);
  }, [jobDelail]);

  const onEditButtonClick = () => {
    setIsEdditMode(!isEdditrMode);
    setUpdateTitle(job?.title);
    setUpdateDescription(job?.description);
  };

  const onApplyButtonClick = async () => {
    const updatedJob = await updateJob({
      id: jobId,
      title: updateTitle,
      description: updateDescription,
    });

    setIsEdditMode(!isEdditrMode);
    setJob(updatedJob);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="p-6">
      <div style={{ gap: '10px' }} className="is-flex">
        {isEdditrMode ? (
          <div className="control">
            <input
              onChange={(e) => setUpdateTitle(e.target.value)}
              className="title is-2 m-0 p-0"
              type="text"
              value={updateTitle}
            />
          </div>
        ) : (
          <h1 className="title is-2 m-0">{job?.title}</h1>
        )}
        <button
          onClick={onEditButtonClick}
          type="button"
          className="button is-small is-warning"
        >
          {isEdditrMode ? 'CANCEL' : 'EDIT'}
        </button>
        {isEdditrMode && (
          <button
            onClick={onApplyButtonClick}
            type="button"
            className="button is-small is-success"
          >
            Apply
          </button>
        )}
      </div>
      <h2 className="subtitle is-4">
        <Link to={`/companies/${job?.company.id}`}>{job?.company.name}</Link>
      </h2>
      <div className="box">
        <div className="block has-text-grey">
          Posted: <span className="has-text-primary">{job?.date}</span>
        </div>
        {isEdditrMode ? (
          <div className="control">
            <input
              onChange={(e) => setUpdateDescription(e.target.value)}
              className="m-0 p-0"
              type="text"
              value={updateDescription}
            />
          </div>
        ) : (
          <p className="block">{job?.description}</p>
        )}
      </div>
    </div>
  );
}

export default JobDetail;
