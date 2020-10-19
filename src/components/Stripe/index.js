import React, { Component } from 'react';
const STRIPE_PK = 'pk_test_TYooMQauvdEDq54NiTphI7jx';

class StripePaymentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'stripeToken': '',
            'isPaymentInProgres': false,
            'showPaymentForm': false,
            'rememberMe': false,
            'setSelectedCard': '',
            'selectedCardIndex': 1
        };

    }

    /*set remember me in state.*/
    setRememberMe = (e) => this.setState({ 'rememberMe': e.target.checked })

    /*show payment page on back btn click*/
    showPaymentPage = () => this.setState({ 'showPaymentForm': !this.state.showPaymentForm });

    /*use existing card and start payment*/
    useExistingCard = () => {
        //
    }

    /*set card for payment*/
    setCardForPayment = (cardNumber, cardIndex) => {
        this.setState({
            'setSelectedCard': cardNumber,
            'selectedCardIndex': cardIndex
        });
    }

    /*redirect to summery page once done*/
    redirectToSummaryPage = () => {
        //
    }

    componentDidMount() {
        let stripe = window.Stripe(STRIPE_PK);
        let elements = stripe.elements();
        let fontSize = window.innerWidth <= 375 ? '18px' : '23px';
        let that = this;
        let style = {
            base: {
                color: '#484b52',
                fontFamily: '"mosk-medium", sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: fontSize,
                '::placeholder': {
                    color: '#ccc'
                }
            },
            invalid: {
                color: '#eb1c26'
            }
        };

        // Create an instance of the card Element
        let cardNumber = elements.create('cardNumber', { style });
        let cardExpiry = elements.create('cardExpiry', { style });
        let cardCvv = elements.create('cardCvc', { style });

        // Add an instance of the card Element into the `card-element` <div>
        cardNumber.mount('#card-number');
        cardExpiry.mount('#card-expiry');
        cardCvv.mount('#card-cvv');

        // Handle form submission
        let form = document.getElementById('payment-form');
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            stripe.createToken(cardNumber).then(function (result) {
                if (result.error) {
                    // Inform the user if there was an error
                    let errorElement = document.getElementById('card-errors');
                    errorElement.textContent = result.error.message;
                } else {
                    // set token in state
                    that.setState({ 'stripeToken': result.token.id, 'isPaymentInProgres': true }, () => {
                        // start payment
                    });
                }
            });
        });
    }

    render() {
        const existingCards = [];

        let existingCardsBlock = existingCards.length && existingCards.map((cardData, key) => {
            return (<div key={cardData.id}>
                <label>
                    <input type="radio" name="cards" onClick={e => this.setCardForPayment(cardData.id, key + 1)} defaultChecked={this.state.selectedCardIndex === key + 1 ? true : false} />
                    <span>{cardData.brand} </span>
                    <span>xxxx xxxx xxx {cardData.last4}</span>
                </label>
            </div>);

        });
        const orderAmount = '$100';
        const userEmailId = 't.kotlapure12@gmail.com';

        return (
            <div className="stripe-form">
                <div className={`card-details ${!existingCardsBlock ? 'hide-form' : 'show-form'}`}>
                    <h2>Pay using existing card</h2>
                    {existingCardsBlock}
                    <button onClick={this.showPaymentPage} className="new-card">Pay with new card</button>
                    <button className="fixed-cta" onClick={this.useExistingCard}>Pay &pound;{orderAmount}</button>
                </div>
                <form id="payment-form" className={`${this.state.showPaymentForm || !existingCardsBlock ? 'show-form' : 'hide-form'}`}>
                    <div className="form-row">
                        <label htmlFor="email">Email:</label>
                        <div id="email">{userEmailId}</div>
                    </div>
                    <div className="form-row">
                        <label htmlFor="card-number">Card:</label>
                        <div id="card-number"></div>
                    </div>
                    <div className="form-row">
                        <label htmlFor="card-expiry">Expiry:</label>
                        <div id="card-expiry"></div>
                        <label htmlFor="card-cvv">CVC:</label>
                        <div id="card-cvv"></div>
                    </div>
                    <div className="remember-me-btn">
                        <label>Remember me:</label>
                        <input type="checkbox" name="rememberMe" onClick={this.setRememberMe} ref="rememberMe" />
                    </div>
                    <div id="card-errors" role="alert"></div>
                    <button className="fixed-cta btn-primary btn">Pay {orderAmount}</button>
                </form>
            </div>
        );
    }
}
export default StripePaymentForm;
