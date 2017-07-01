import React, { Component } from 'react';
import { Button, Popup, Article } from 'react-weui';
import Client from "./Client";

class DetailPage extends Component {
    state = {
    }

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

    render() {
      return (
        <Popup show={this.props.show}>
          <div style={{height: '100vh', overflow: 'scroll'}}>
            <Article>
              <h1>{this.state.Name}</h1>
              <section>
                <h2 className="title">{this.state.Address}</h2>
                <section>
                    <h3>{this.state.Rating}</h3>
                    <h3>{this.state.Price}</h3>
                    <h3>{this.state.ReviewCount}</h3>
                    <h3>{this.state.Style}</h3>
                    <p>
                        {this.props.img &&
                          <img src={this.props.img.OURL}
                               alt="Entrie"
                               style={{width: '30vw'}}/>
                        }
                    </p>
                </section>
                <section>
                    <p>{this.state.PhoneNumber}</p>
                </section>
              </section>
              <Button onClick={e=>this.props.hideDetailPage()}>Close Popup</Button>
            </Article>
          </div>
        </Popup>
      );
    }
}

export default DetailPage;