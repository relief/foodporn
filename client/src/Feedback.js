import React, { Component } from 'react';
import { Popup, CellsTitle, Form, FormCell, 
         CellBody, TextArea, Button, ButtonArea,
         CellHeader, Label, Input } from 'react-weui';
import Client from "./Client";
import "./stylesheets/feedback.css";

class Feedback extends Component {
    state = {
      comment: '',
      phone: '',
      email: ''
    }

    componentWillReceiveProps = (nextProps) => {
      if (!this.props.show && nextProps.show && nextProps.img) {
        const id = this.props.img.restaurant_id;

        Client.fetchRestaurant(id, restaurants => {
          this.setState(restaurants);
        });
      }
    }

    handleCommentChange = (e) => {
      this.setState({ comment: e.target.value });
    }
    
    handleEmailChange = (e) => {
      this.setState({ email: e.target.value });
    }

    handlePhoneChange = (e) => {
      this.setState({ phone: e.target.value });
    }

    onClickSubmitButton = (e) => {
      Client.submitFeedback(this.state.comment, this.state.email, this.state.phone)
      this.props.hideFeedback();
    }

    render() {
      return (
        <Popup show={this.props.show}>
          <div className="flex-col flex-horizontal-center"
               style={{height: '100vh', overflow: 'scroll'}}>
            <CellsTitle>How do we serve you better?</CellsTitle>
            <Form>
              <FormCell>
                <CellBody>
                  <TextArea placeholder="Enter your comments"
                            rows="3"
                            maxlength="200"
                            value={this.state.comment}
                            onChange={this.handleCommentChange}>
                  </TextArea>
                </CellBody>
              </FormCell>
            </Form>
            <CellsTitle>Would you like to provide more feedback? (Optional)</CellsTitle>
            <Form>
              <FormCell>
                <CellHeader>
                    <Label>Email</Label>
                </CellHeader>
                <CellBody>
                    <Input type="email"
                           placeholder="Enter your email"
                           value={this.state.email}
                           onChange={this.handleEmailChange}/>
                </CellBody>
              </FormCell>
              <FormCell>
                <CellHeader>
                    <Label>Phone</Label>
                </CellHeader>
                <CellBody>
                    <Input type="tel"
                           placeholder="Enter your phone number" 
                           value={this.state.phone}
                           onChange={this.handlePhoneChange} />
                </CellBody>
              </FormCell>
            </Form>
            <ButtonArea direction="horizontal">
              <Button onClick={this.onClickSubmitButton} >
                Submit
              </Button>
            </ButtonArea>
          </div>
        </Popup>
      );
    }
}

export default Feedback;