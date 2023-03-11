import React from 'react';
import { Form, SearchbarHed, Button } from './Searchbar.styled';
export class Searchbar extends React.Component {
  state = {
    request: '',
  };
  writeInput = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };
  formSubmit = e => {
    e.preventDefault();
    this.props.onAddRequest(this.state.request);
    this.reset();
  };
  reset = () => {
    this.setState({ request: '' });
  };
  render() {
    return (
      <SearchbarHed>
        <Form onSubmit={this.formSubmit}>
          <Button type="submit">
            <span>Search</span>
          </Button>

          <input
            name="request"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.request}
            onChange={this.writeInput}
          />
        </Form>
      </SearchbarHed>
    );
  }
}
