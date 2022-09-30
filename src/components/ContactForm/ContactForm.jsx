import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';
import { RiUserAddFill } from 'react-icons/ri';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameId = nanoid();
  numberId = nanoid();

  handleInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.addContact(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { nameId, numberId } = this;

    return (
      <form className={s.form__card} onSubmit={this.handleSubmit}>
        <div className={s.form__list}>
          <div className={s.form__item}>
            <label className={s.form__title} htmlFor={nameId}>
              Name
            </label>
            <input
              className={s.form__input}
              id={nameId}
              type="text"
              onChange={this.handleInputChange}
              name="name"
              value={this.state.name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </div>

          <div className={s.form__item}>
            <label className={s.form__title} htmlFor={numberId}>
              Number
            </label>
            <input
              className={s.form__input}
              id={numberId}
              type="tel"
              onChange={this.handleInputChange}
              name="number"
              value={this.state.number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </div>
        </div>

        <button className={s.form__btn} type="submit">
          <RiUserAddFill />
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
