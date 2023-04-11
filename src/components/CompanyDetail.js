import { useParams } from "react-router";
import { useCompany } from "../hooks/useCompany";

function CompanyDetail() {
  const { companyId } = useParams();

  const { company, loading, error } = useCompany(companyId);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Loading...</p>;
  }

  return (
    <section className="section">
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h5 className="title is-5">Jobs at {company.name}</h5>
      <div className="content">
        <ul>
          {company.jobs.map((job) => (
            <li key={job.id}>{job.description}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default CompanyDetail;
