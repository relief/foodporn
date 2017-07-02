import React, { Component } from 'react';
import { Popup, Preview, PreviewHeader, PreviewBody, PreviewItem, Button, ButtonArea } from 'react-weui';
import Client from "./Client";
import "./stylesheets/detail_page.css";

const LOADING_STATE = {
  name: 'Loading',
  price: 'Loading',
  phone_number: 'Loading',
  address: 'Loading'
}

class DetailPage extends Component {
    state = LOADING_STATE

    componentWillReceiveProps = (nextProps) => {
      if (!this.props.show && nextProps.show && nextProps.img) {
        const id = this.props.img.restaurant_id;

        Client.fetchRestaurant(id, restaurants => {
          this.setState(restaurants);
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

    onClickBackButton = (e) => {
      this.setState(LOADING_STATE);
      this.props.hideDetailPage();
    }

    onClickLikeButton = (e) => {
      Client.likeEntrie(this.props.img.id, rtn => {
        this.props.onLike(this.props.img.id);
      });
    }

    cleanAddress = () => {
      let address = this.state.address;
      
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
                    <img src={this.props.img.url + '258s.jpg'}
                         className="detail-page_image"
                         alt="Entrie" />
                }
              </PreviewHeader>
              <PreviewBody>
                  <PreviewItem label="Restaurant" value={this.state.name} />
                  <PreviewItem label="Price" value={this.state.price} />
                  <PreviewItem label="Phone" value={this.state.phone_number} />
                  <PreviewItem label="Address" value={this.cleanAddress()} />
                  <a href={"https://maps.google.com/?q=" + this.cleanAddress()}
                     className="open-in-map" >
                      Open in Map
                  </a>
              </PreviewBody>
            </Preview>
            <ButtonArea direction="horizontal">
                  <Button type="default"
                          onClick={this.onClickBackButton}
                          plain>
                    Back
                  </Button>
                  {this.props.img &&
                    <Button onClick={this.onClickLikeButton}
                            disabled={this.props.likeList.includes(this.props.img.id)}>
                      Like it!
                    </Button>
                  }
                  
            </ButtonArea>
          </div>
        </Popup>
      );
    }
}

export default DetailPage;