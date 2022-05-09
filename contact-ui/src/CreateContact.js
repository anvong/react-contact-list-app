import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import searlizeForm from 'form-serialize'
import ImageInput from './ImageInput'

class CreateContact extends Component {

  handleSubmit = (e) => {
    e.preventDefault()
    const values = searlizeForm(e.target, { hash: true });
    if(this.props.onCreateContact) {
      this.props.onCreateContact(values)
    }
  }

  render() {
    return (
      <div>
        <Link to='/' className='close-create-contact'>Close</Link>
        <form onSubmit={this.handleSubmit} className='create-contact-form'>
          <ImageInput
            className='create-contact-avatar-input'
            name='avatarURL'
            maxHeight={64}
          />
          <div className='create-contact-details'>
            <input type='text' placeholder='First name' name='first_name' />
            <input type='text' placeholder='Last name' name='last_name' />
            <input type='text' placeholder='Email' name='email' />
            <input type='text' placeholder='Phone' name='phone' />
            <button>Add Contact</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateContact
