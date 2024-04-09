import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { postPayment } from '../api';

const Container = styled.div`
  margin: 10px;
  border: 1px solid transparent;
  border-radius: 5px;
  position: relative;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  height: 350px;
`;

const Footer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 1rem 2rem;
`;

const Detail = styled.div`
  width: 100%;
  background-color: rgb(255, 255, 255, 0.9);
  z-index: 1;
  height: 100%;
  position: absolute;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 1.2rem;
`;

const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Button = styled.button`
  background-color: white;
  border: 1px solid #1a53f0;
  border-radius: 3px;
  color: #1a53f0;
  padding: 10px;
  font-size: 1.2rem;
`;

export default connect((state) => state)(function Card(props) {
  const { item } = props;
  const DONATE_LIST = [10, 20, 50, 100, 500];
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [showDonateDetail, setShowDonateDetail] = useState(false);

  const payments = DONATE_LIST.map((amount, j) => (
    <label key={j} style={{ marginLeft: '10px' }}>
      <input
        type="radio"
        name="payment"
        onClick={() => {
          setSelectedAmount(amount);
          setShowDonateDetail(true);
        }}
      />
      {amount}
    </label>
  ));

  const handlePay = (id, amount, currency) => {
    postPayment({ id, amount, currency })
      .then((data) => {
        props.dispatch({
          type: 'UPDATE_TOTAL_DONATE',
          amount: amount,
        });
      })
      .then(() => {
        props.dispatch({
          type: 'UPDATE_MESSAGE',
          message: 'Thank you for your donation!',
        });
      });
  };

  return (
    <Container key={item.id}>
      {showDonateDetail ? (
        <>
          <Detail>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Close onClick={() => setShowDonateDetail(false)}>
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.1422 1.00005L1.00005 15.1422M15.1421 15.1421L1 1"
                    stroke="#171717"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </Close>
              <p style={{ textAlign: 'center' }}>
                Select the amount to donate (THB)
              </p>
              <div>{payments}</div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '10px',
                }}
              >
                <Button
                  onClick={() => {
                    handlePay(item.id, selectedAmount, item.currency);
                  }}
                >
                  Pay
                </Button>
              </div>
            </div>
          </Detail>
        </>
      ) : null}
      <Image src={`/images/${item.image}`} alt={item.name} />
      <Footer>
        <p style={{ fontSize: '1.2rem' }}>{item.name}</p>
        <Button
          style={{ borderColor: '#1A53F0', color: '#1A53F0' }}
          onClick={() => {
            setShowDonateDetail(true);
          }}
        >
          Donate
        </Button>
      </Footer>
    </Container>
  );
});
