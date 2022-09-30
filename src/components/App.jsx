import React from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import s from './App.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
      // повертаються всі контакти що не дорівнюють "contactId",
      // тобто того що ми хочемо видалити
    }));
  };

  handleInputChange = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  formSubmitHandler = contact => {
    const { name } = contact;
    const checkAddName = this.state.contacts.some(el => el.name === name);
    const newContact = {
      id: nanoid(),
      ...contact,
    };

    if (checkAddName) {
      // return alert(`${contact.name} is already in contacts.`);
      return toast.error(`${name} is already in contacts.`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    this.setState(prev => {
      return { contacts: [...prev.contacts, newContact] };
      // в contacts записується новий масив в який розпилюється
      // попереднє значення та додається новий контакт (data)
    });
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;

    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLocaleLowerCase();
    const filterContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLocaleLowerCase();
      const result = normalizedName.includes(normalizedFilter);
      return result;
    });
    return filterContacts;
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (!contacts) {
      return;
    }
    const parsedContacts = JSON.parse(contacts);

    this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(PrevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const contacts = this.getFilteredContacts();
    return (
      <div className={s.phonebook}>
        <div className={s.phonebook__card}>
          <h1 className={s.phonebook__title}>Phonebook</h1>
          <ContactForm addContact={this.formSubmitHandler} />

          <h2 className={s.phonebook__second_title}>Contacts</h2>
          <Filter input={filter} onChange={this.handleChange} />
          {contacts.length === 0 ? (
            <p className={s.empty__text}>Phone book is empty</p>
          ) : (
            <ContactList
              contacts={contacts}
              onDeleteContact={this.deleteContact}
            />
          )}
        </div>
        <ToastContainer
          theme="colored"
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}
