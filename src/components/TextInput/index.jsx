import P from 'prop-types';
import './styles.css';

export const TextInput = ({ handleChange, searchValue }) => (
  <input
    className="text-input"
    onChange={handleChange}
    type="search"
    value={searchValue}
    placeholder="Type your search"
  />
);

TextInput.propTypes = {
  handleChange: P.func.isRequired,
  searchValue: P.string.isRequired,
};
