import JobList from './JobList';
// import { useJobs } from "../hooks/useJobs";
import { useEffect, useState } from 'react';
import { getJobs } from '../graphql/project-queries';
import { useTransitionHook } from '../hooks/useTransition';
import { animated } from '@react-spring/web';
// import UsersList from './UsersList';

function JobBoard() {
  const { transitions } = useTransitionHook();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs().then(setJobs);
  }, []);

  console.log(jobs);

  // const { jobs, loading, error } = useJobs();

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Something went wrong...</p>;
  // }

  return (
    <div>
      <section className="hero is-medium is-dark is-bold">
        <div className="hero-body has-text-centered">
          <p className="title">Jobs-Board</p>
        </div>
      </section>
      {transitions((style) => {
        return (
          <animated.div style={style}>
            <JobList jobs={jobs} />
            {/* <UsersList /> */}
          </animated.div>
        );
      })}
    </div>
  );
}

export default JobBoard;
