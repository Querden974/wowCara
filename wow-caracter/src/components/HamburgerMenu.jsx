import "./HamburgerMenu.css";

export default function HamburgerMenu({ isOpen, changeIsOpen, data }) {
  function handleClick() {
    if (Object.keys(data).length > 0) {
      changeIsOpen(!isOpen);
    }
  }
  return (
    <div className="flex justify-end visible sm:hidden">
      <div
        id="nav-icon3"
        onClick={handleClick}
        className={`${isOpen ? "open" : ""}`}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
