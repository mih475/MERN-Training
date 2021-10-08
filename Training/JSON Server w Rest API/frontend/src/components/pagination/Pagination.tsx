import React from 'react';
import classnames from 'classnames';
//import { usePagination, DOTS } from './usePagination';
import './pagination.scss';
const Pagination = (props:any) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

//   const paginationRange = usePagination({
//     currentPage,
//     totalCount,
//     siblingCount,
//     pageSize
//   });

  // If there are less than 2 times in pagination range we shall not render the component
//   if (currentPage === 0 || usePagination.length < 2) {
//     return null;
//   }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

//   if(paginationRange){
//     let lastPage = paginationRange[usePagination.length - 1];
//   }
//   return (
//     <ul
//       className={classnames('pagination-container', { [className]: className })}
//     >
//        {/* Left navigation arrow */}
//       <li
//         className={classnames('pagination-item', {
//           disabled: currentPage === 1
//         })}
//         onClick={onPrevious}
//       >
//         <div className="arrow left" />
//       </li>
//       {usePagination.map(pageNumber => {
         
//         // If the pageItem is a DOT, render the DOTS unicode character
//         if (pageNumber === DOTS) {
//           return <li className="pagination-item dots">&#8230;</li>;
//         }
		
//         // Render our Page Pills
//         return (
//           <li
//             className={classnames('pagination-item', {
//               selected: pageNumber === currentPage
//             })}
//             onClick={() => onPageChange(pageNumber)}
//           >
//             {pageNumber}
//           </li>
//         );
//       })}
//       {/*  Right Navigation arrow */}
//       <li
//         className={classnames('pagination-item', {
//           disabled: currentPage === lastPage
//         })}
//         onClick={onNext}
//       >
//         <div className="arrow right" />
//       </li>
//     </ul>
//   );
};

export default Pagination;