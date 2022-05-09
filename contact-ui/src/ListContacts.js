import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


// Components, class method

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
    onEditContact: PropTypes.func.isRequired
  }

  state = {
    query: '',
    editID:'',
    first_name: '',
    last_name: '',
    email:'',
    phone: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  handleChangeFirstName = (e) => {
    this.setState({ first_name: e.target.value });
  };

  handleChangeLastName = (e) => {
    this.setState({ last_name: e.target.value });
  };

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handleChangePhone = (e) => {
    this.setState({ phone: e.target.value });
  };

  handleEditContact = (contact, onEditContact) => {
    onEditContact(contact);
    this.setState({ editID: contact.id, first_name: contact.first_name, last_name: contact.last_name, email: contact.email, phone: contact.phone })
  }

  handleUpdateContact = (contact, onUpdateContact) => {
    let contactChanged = {... contact, first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email, phone: this.state.phone }
    onUpdateContact(contactChanged)
    this.setState({ editID: '', first_name: '', last_name: '', email: '', phone: '' })
  }

  render() {
    const { contacts, onDeleteContact, onEditContact, isEdit, onUpdateContact } = this.props
    const { query } = this.state
    let showingContacts
  
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingContacts = contacts.filter((contact) => match.test(contact.first_name))
    } else {     
      showingContacts = contacts;
    }

    showingContacts.sort(sortBy('first_name'))

    return (
      <div className='list-contacts'>
        <h3 className='page-title'>Contacts Directory</h3>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search contacts..'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}/>
            <Link
              to='/create'
              className='add-contact'>
              Add Contact</Link>
        </div>

        {showingContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>{showingContacts.length} of {contacts.length} | </span>
            <button onClick={this.clearQuery}>Show All</button>
          </div>
        )}

        <ol className='contact-list'>
          {showingContacts.map( contact => (
            <li key={contact.id} className='contact-list-item'>
              {/* <div className='contact-avatar' style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}> </div> */}
              {this.state.editID != contact.id && <div className='contact-details'>
                <p>{contact.first_name} {contact.last_name} </p>
                <p>{contact.email}</p>
                <p>{contact.phone}</p>
              </div>}
              {isEdit && this.state.editID === contact.id && <div className='contact-details'>
                <input className='contact-edit-input' type='text' placeholder='First name' name='first_name' value={this.state.first_name} onChange={this.handleChangeFirstName} />
                <input className='contact-edit-input' type='text' placeholder='Last name' name='last_name' value={this.state.last_name} onChange={this.handleChangeLastName} />
                <input className='contact-edit-input' type='text' placeholder='Email' name='email' value={this.state.email} onChange={this.handleChangeEmail} />
                <input className='contact-edit-input' type='text' placeholder='Phone' name='phone' value={this.state.phone} onChange={this.handleChangePhone} />
                <button className='contact-edit-button' onClick={() => this.handleUpdateContact(contact,onUpdateContact)}>Update</button>
              </div>}
              <button className='contact-edit' onClick={() => this.handleEditContact(contact, onEditContact)}>
                Edit
              </button>
              &nbsp;&nbsp;
              <button className='contact-remove' onClick={() => onDeleteContact(contact)}>
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}






export default ListContacts
