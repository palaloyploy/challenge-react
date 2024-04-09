import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { summaryDonations } from './helpers';
import Card from './components/Card';
import { getCharities, getPayments } from './api';

export default connect((state) => state)(
  class App extends Component {
    state = {
      charities: [],
      selectedAmount: 10,
    };

    componentDidMount() {
      const self = this;
      getCharities().then(function (data) {
        self.setState({ charities: data });
      });

      getPayments().then(function (data) {
        self.props.dispatch({
          type: 'UPDATE_TOTAL_DONATE',
          amount: summaryDonations(data.map((item) => item.amount)),
        });
      });
    }

    render() {
      const style = {
        color: 'red',
        margin: '1em 0',
        fontWeight: 'bold',
        fontSize: '16px',
        textAlign: 'center',
      };

      const donate = this.props.donate;
      const message = this.props.message;

      const CardList = styled.div`
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 30px;

        @media (max-width: 640px) {
          grid-template-columns: 1fr;
        }
      `;

      const cardList = this.state.charities.map((item, i) => (
        <Card key={i} item={item} />
      ));

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h1 style={{ color: '#666F84', fontWeight: 'bold' }}>
            Omise Tamboon React
          </h1>
          <p>All donations: {donate}</p>
          <p style={style}>{message}</p>
          <CardList>{cardList}</CardList>
        </div>
      );
    }
  }
);
