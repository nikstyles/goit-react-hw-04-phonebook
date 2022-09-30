import React, { Component } from 'react';
import { RiDeleteBin2Fill, RiUser3Fill } from 'react-icons/ri';
import s from './ContactItem.module.css';
import PropTypes from 'prop-types';

export default class ContactItem extends Component {
  render() {
    const { name, number, id, onDeleteContact } = this.props;
    return (
      <>
        <li className={s.contacts__item} key={id} id={id}>
          <RiUser3Fill size={20} />
          {name} <span>{number}</span>
          <button
            className={s.contacts__btn}
            onClick={() => onDeleteContact(id)}
          >
            <RiDeleteBin2Fill size={20} />
          </button>
        </li>
      </>
    );
  }
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
