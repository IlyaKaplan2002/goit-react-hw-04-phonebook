import React, { useEffect, useState } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { v4 as uuid } from 'uuid';
import Section from './Section';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsData = localStorage.getItem('contacts');
    if (contactsData && contactsData.length > 0) {
      setContacts([...JSON.parse(contactsData)]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const id = uuid();
    const { name } = contact;

    if (contacts.filter(contact => contact.name === name).length > 0) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts(prevState => [...prevState, { id, ...contact }]);
  };

  const deleteItem = id => {
    setContacts(prevState => [...prevState.filter(item => item.id !== id)]);
  };

  const onFilterChange = e => {
    const filter = e.target.value;
    setFilter(filter.toLowerCase());
  };

  const getFilteredContacts = () =>
    contacts.filter(({ name }) => name.toLowerCase().includes(filter));

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter onChange={onFilterChange} />

        <ContactList onDelete={deleteItem} items={getFilteredContacts()} />
      </Section>
    </>
  );
};

export default App;
