import React, { Component } from 'react';
import { Picker, FormCell, CellBody, Label } from 'react-weui';
import "./stylesheets/location_picker.css";

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
          <FormCell>
            <CellBody>
                <Label
                    onClick={e=>{
                        e.preventDefault()
                        this.setState({picker_show: true})
                    }}
                >
                  {this.props.location} <span className="caret"></span>
                </Label>
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
        );
    }
}

export default LocationPicker;