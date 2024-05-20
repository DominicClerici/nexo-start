const MainButton = ({ children, onClick, disabled, className }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${className} button-colors px-4 py-1.5 disabled:bg-black/20 disabled:text-black/50 dark:disabled:bg-white/20 dark:disabled:text-white/40`}
    >
      {children}
    </button>
  )
}

export default MainButton
