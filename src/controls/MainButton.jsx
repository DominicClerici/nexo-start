const MainButton = ({ children, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="rounded bg-black/60 px-4 py-1 text-lg text-white/90 hover:bg-black active:bg-black/70 disabled:bg-black/20 dark:bg-white/80 dark:text-black dark:hover:bg-white dark:active:bg-white/85 dark:disabled:bg-white/30"
    >
      {children}
    </button>
  )
}

export default MainButton
