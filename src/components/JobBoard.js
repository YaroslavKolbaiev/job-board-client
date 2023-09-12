/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { getJobs } from '../graphql/project-queries';
// import { gql, useQuery } from '@apollo/client';
import JobList from './JobList';
import { useTransitionHook } from '../hooks/useTransition';
import { animated } from '@react-spring/web';
import PaginationBar from './PaginationBar';
// import { useJobs } from '../hooks/useJobs';

// import UsersList from './UsersList';

const JOBS_PER_PAGE = 5;

function JobBoard() {
  const { transitions } = useTransitionHook();
  const [currentPage, setCurrentPage] = useState(1);

  //implementation without apollo hooks
  const [jobs, setJobs] = useState([]);
  const [totalCount, setTotalCount] = useState();

  useEffect(() => {
    (async () => {
      const { jobs, totalItems } = await getJobs(
        JOBS_PER_PAGE,
        (currentPage - 1) * JOBS_PER_PAGE
      );
      setJobs(jobs);
      setTotalCount(totalItems);
    })();
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / JOBS_PER_PAGE); // useMemo

  // implementation with apollo hooks
  // const { jobs, loading, error } = useJobs();

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>{error.message}</p>;
  // }

  return (
    <div>
      <section className="hero is-medium is-dark is-bold">
        <div className="hero-body has-text-centered">
          <p className="title">Jobs-Board</p>
        </div>
      </section>
      <PaginationBar
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {transitions((style) => {
        return (
          <animated.div style={style}>
            <JobList jobs={jobs} setJobs={setJobs} />
            {/* <UsersList /> */}
          </animated.div>
        );
      })}
    </div>
  );
}

export default JobBoard;
