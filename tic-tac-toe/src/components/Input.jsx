export default function Input({ value, handleChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      className="nes-input  is-dark"
      onChange={(e) => handleChange(e)}
      placeholder={placeholder}
    ></input>
  );
}
