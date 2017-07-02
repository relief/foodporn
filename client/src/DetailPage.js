import React, { Component } from 'react';
import { Popup, Preview, PreviewHeader, PreviewFooter, PreviewBody, PreviewItem, PreviewButton } from 'react-weui';
import Client from "./Client";
import "./stylesheets/detail_page.css";

const LOADING_STATE = {
  Name: 'Loading',
  Price: 'Loading',
  PhoneNumber: 'Loading',
  Address: 'Loading'
}

class DetailPage extends Component {
    state = LOADING_STATE

    componentWillReceiveProps = (nextProps) => {
      if (!this.props.show && nextProps.show && nextProps.img) {
        const id = this.props.img.Restaurant_Id;

        Client.fetchRestaurant(id, restaurants => {
          this.setState(restaurants[0]);
        });
      }
    }

    handleSearchChange = (filter) => {
      if (filter === "") {
        console.log('empty');
      } else {
        Client.fetchEntries(filter, entries => {
          this.setState({
            entries: entries,
            current: 0
          });
        });
      }
    }

    onClickPrimaryButton = (e) => {
      this.setState(LOADING_STATE);
      this.props.hideDetailPage();
    }

    trimURL = () => {
      const url = this.props.img.OURL;
      return url.substring(0, url.length - 5) + '258s.jpg'
    }

    cleanAddress = () => {
      let address = this.state.Address;
      
      address = address.replace(/#/g, ', ');
      const indexV = address.indexOf('Vancouver');
      // console.log(address);
      // console.log(indexV);
      address = address.substring(0, indexV + 9);
      return address;
    }

    render() {
      return (
        <Popup show={this.props.show}>
          <div className="flex-col flex-horizontal-center"
               style={{height: '100vh', overflow: 'scroll'}}>
            <Preview>
              <PreviewHeader className="text-align-center">
                {this.props.img &&
                    <img src={this.trimURL()}
                         className="detail-page_image"
                         alt="Entrie" />
                }
              </PreviewHeader>
              <PreviewBody>
                  <PreviewItem label="Restaurant" value={this.state.Name} />
                  <PreviewItem label="Price" value={this.state.Price} />
                  <PreviewItem label="Phone" value={this.state.PhoneNumber} />
                  <PreviewItem label="Address" value={this.cleanAddress()} />
              </PreviewBody>
              <PreviewFooter>
                  <PreviewButton onClick={this.onClickPrimaryButton}>
                    Back
                  </PreviewButton>
                  {this.state.Address &&
                    <PreviewButton primary 
                      href={"https://maps.google.com/?q=" + this.cleanAddress()} >
                      Open in Map
                    </PreviewButton>
                  }
              </PreviewFooter>
            </Preview>
          </div>
        </Popup>
      );
    }
}

export default DetailPage;