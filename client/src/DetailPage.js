import React, { Component } from 'react';
import { Button, Popup, Article } from 'react-weui';

class DetailPage extends Component {

    render() {
      return (
        <Popup show={this.props.show}>
          <div style={{height: '100vh', overflow: 'scroll'}}>
            <Article>
              <h1>H1 Heading</h1>
              <section>
                <h2 className="title">H2 Title</h2>
                <section>
                    <h3>H3 Heading</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute</p>
                    <p>
                        {this.props.img &&
                          <img src={this.props.img.image_url} alt="Entrie"/>
                        }
                    </p>
                </section>
                <section>
                    <h3>H3 Heading</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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