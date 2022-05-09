import React, { Component } from 'react';
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import CSVReader from './importCSV'
import { Route } from 'react-router-dom'
import * as ContactsAPI from './utils/ContactsAPI'

// class components for mmutable data to track any changes in the state

class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      console.log(contacts);
      this.setState({ contacts })
    })
  }

  removeContact = (contact) => {
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    ContactsAPI.remove(contact)
  }

  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([contact])
      }))
    })
  }

  editContact = (contact) => {
    this.setState(state =>({
      isEdit: true
    }))
  }

  updateContact = async (contact) => {
    const resEdit = await ContactsAPI.edit(contact)
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }

  importContact(listArray) {
    let request = []
    for (let i = 1; i < listArray.length - 1; i++) {
      const array = listArray[i]
      let contact = {}
      for (let j = 0; j < array.length; j++) {
        switch (j) {
          case 0:
            contact.first_name = array[0]
            break
          case 1:
            contact.last_name = array[1]
            break
          case 2:
            contact.email = array[2]
            break
          default:
            contact.phone = array[3]
            break
        }
      }
      request.push(contact)
    }
    ContactsAPI.importCSV(request).then(contacts => {
      this.setState(state => ({
        contacts: state.contacts.concat(contacts)
      }))
    })

  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <div>
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}
              onEditContact={this.editContact}
              onUpdateContact={this.updateContact}
              isEdit={this.state.isEdit}
            />
            <CSVReader onImportContact={(contacts) => {
              this.importContact(contacts)
            }} />
          </div>
        )} />

        <Route path='/create' render={({ history }) => (
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact)
              history.push('/')
            }}
          />
        )} />
      </div>
    )
  }
}

export default App;
