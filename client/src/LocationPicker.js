import React, { Component } from 'react';
import { Picker, Form, FormCell, CellBody, CellHeader, Label, Input } from 'react-weui';

class LocationPicker extends Component {

    state = {
        picker_show: false,
        picker_group: [
            {
                items: [
                    {
                        label: 'Vancouver'
                    },
                    {
                        label: 'San Francisco (Coming soon)',
                        disabled: true
                    },
                    {
                        label: 'Los Angeles (Coming soon)',
                        disabled: true
                    },
                    {
                        label: 'Seattle (Coming soon)',
                        disabled: true
                    },
                    {
                        label: 'New York (Coming soon)',
                        disabled: true
                    }
                ]
            }
        ],
    };

    render() {
        return (
            <Form>
              <FormCell>
                  <CellHeader>
                      <Label>City</Label>
                  </CellHeader>
                  <CellBody>
                      <Input
                          type="text"
                          onClick={e=>{
                              e.preventDefault()
                              this.setState({picker_show: true})
                          }}
                          placeholder="Pick a item"
                          value={this.props.location}
                          readOnly={true}
                      />
                      <Picker
                          onChange={selected=>{
                              let value = ''
                              selected.forEach( (s, i)=> {
                                  value = this.state.picker_group[i]['items'][s].label
                              })
                              
                              this.props.changeLocation(value)
                              this.setState({
                                  picker_show: false
                              })
                          }}
                          groups={this.state.picker_group}
                          show={this.state.picker_show}
                          onCancel={e=>this.setState({picker_show: false})}
                      />
                  </CellBody>
              </FormCell>

            </Form>
            
        );
    }
}

export default LocationPicker;