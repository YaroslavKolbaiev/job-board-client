import { useParams } from 'react-router';
import { useCompany } from '../hooks/useCompany';
// import { useEffect, useState } from 'react';
// import { getCompany } from '../graphql/project-queries';

function CompanyDetail() {
  const { companyId } = useParams();
  const { company, loading, error } = useCompany(companyId);

  if (loading) {
    return <div>loading...</div>;
  }

  // implementation without apollo hooks
  // const [company, setCompany] = useState();
  // const [error, setError] = useState(null);
  // const { companyId } = useParams();
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await getCompany(companyId).then(setCompany);
  //     } catch (err) {
  //       setError(err.message.split(':')[0]);
  //     }
  //   })();
  // }, [companyId]);
  return (
    <section className="section">
      {error ? (
        <h1 className="has-text-danger">{error.message}</h1>
      ) : (
        <>
          <h1 className="title">{company?.name}</h1>
          <div className="box">{company?.description}</div>
          <h5 className="title is-5">Jobs at {company?.name}</h5>
          <div className="content">
            <ul>
              {company?.jobs.map((job) => (
                <li key={job.id}>{job.description}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </section>
  );
}

export default CompanyDetail;
