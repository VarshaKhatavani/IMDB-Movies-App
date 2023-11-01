export default function Pagination(props) {
  let { handleNext, handlePrev, onPageChanges } = props;

  let current = props.currentPage;
  console.log(current);

  const pagesToShow = props.calculatePagesToShow();
  console.log(pagesToShow);

  function getClassDynamically(page) {
    let classes =
      page === props.currentPage
        ? "flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50"
        : "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
    console.log(classes);
    return classes;
  }
  //text-blue-600 border border-blue-300 bg-blue-50

  const pageButtons = pagesToShow.map((page) => (
    <span
      key={page}
      onClick={() => onPageChanges(page)}
      //   className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      className={getClassDynamically(page)}
    >
      {page}
    </span>

    // <button
    //   key={page}
    //   onClick={() => props.onPageChanges(page)}
    //   className={page === props.currentPage ? "active" : ""}
    // >
    //   {page}
    // </button>
  ));

  return (
    <div className="flex justify-center m-4">
      <div
        onClick={handlePrev}
        className="flex items-center justify-center px-3 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white hover:cursor-pointer"
      >
        <span className="sr-only">Previous</span>
        <svg
          className="w-2.5 h-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path stroke="currentColor" d="M5 1 1 5l4 4" />
        </svg>
      </div>
      <span className="flex hover:cursor-pointer">{pageButtons}</span>
      <div
        onClick={handleNext}
        className="p-2 hover:cursor-pointer flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        <span className="sr-only">Next</span>
        <svg
          className="w-2.5 h-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path stroke="currentColor" d="m1 9 4-4-4-4" />
        </svg>
      </div>
    </div>
  );
}
