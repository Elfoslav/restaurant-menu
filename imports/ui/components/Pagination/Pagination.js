import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Pagination.css';

function Pagination(props) {
  // Logic for displaying page numbers
  const pageNumbers = [];
  const lastPage = Math.ceil(props.itemsCount / props.itemsPerPage);
  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li
        key={number}
        className={props.page == number ? 'active' : ''}
      >
        <Link to={`/?page=${number}`}>{number}</Link>
      </li>
    );
  });

  return (
    <ul className="pagination">
      {props.page > 1 &&
        <li><Link to={`/?page=${props.page - 1}`} onClick={props.prev}>&laquo; Prev</Link></li>
      }

      {renderPageNumbers}

      {lastPage !== props.page &&
        <li><Link to={`/?page=${parseInt(props.page) + 1}`} onClick={props.next}>Next &raquo;</Link></li>
      }
    </ul>
  )
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired
};

export default Pagination;
