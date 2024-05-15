const ReOrder = ({ isReordering, isAnyEditing, setIsReordering }) => {
  return (
    <button
      disabled={isAnyEditing}
      onClick={() => setIsReordering(!isReordering)}
      className="customHoverOnPath button-colors flex items-center gap-1 p-1 disabled:pointer-events-none disabled:bg-neutral-400 disabled:text-black/50 dark:disabled:bg-neutral-700 dark:disabled:text-white/50"
    >
      {isReordering ? (
        <svg
          stroke="currentColor"
          fill="currentColor"
          className="dontAnim h-6 w-6 transition-transform group-hover:scale-125"
          strokeWidth="0"
          viewBox="0 0 448 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path>
        </svg>
      ) : (
        <svg
          className="h-5 w-5"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="transition-[d]"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={"M2 20 L12 20 L22 20"}
          ></path>
          <path
            className="transition-[d]"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={"M2 12 L22 12"}
          ></path>
          <path
            className="transition-[d]"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={"M2 4 L12 4 L22 4"}
          ></path>
        </svg>
      )}
      {isReordering ? "Done" : "Reorder"}
    </button>
  )
}

export default ReOrder
