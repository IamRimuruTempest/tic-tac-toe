export default function Button({ name, type, handleClick }) {
  return (
    <>
      <button onClick={handleClick} className={`nes-btn is-${type}`}>
        {name}
      </button>
    </>
  );
}
