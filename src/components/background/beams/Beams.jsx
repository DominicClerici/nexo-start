import "./beams.css"
const Beams = ({ darkMode }) => {
  return (
    <div class={`lines fixed inset-0 -z-10 flex justify-between ${!darkMode && "lightC"}`}>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
  )
}

export default Beams
