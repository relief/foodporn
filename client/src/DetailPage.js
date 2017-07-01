import React, { Component } from 'react';
import { Popup, Preview, PreviewHeader, PreviewFooter, PreviewBody, PreviewItem, PreviewButton } from 'react-weui';
import Client from "./Client";
import "./stylesheets/detail_page.css";

class DetailPage extends Component {
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

    trimURL = () => {
      const url = this.props.img.OURL;
      return url.substring(0, url.length - 5) + '258s.jpg'
    }

    render() {
      return (
        <Popup show={this.props.show}>
          <div className="flex-col flex-horizontal-center"
               style={{height: '100vh', overflow: 'scroll'}}>
            {this.state &&
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
                    <PreviewItem label="Address" value={this.state.Address} />

                </PreviewBody>
                <PreviewFooter>
                    <PreviewButton primary onClick={e=>this.props.hideDetailPage()}>
                      Back to Photos
                    </PreviewButton>
                </PreviewFooter>
              </Preview>
            }
          </div>
        </Popup>
      );
    }
}

export default DetailPage;