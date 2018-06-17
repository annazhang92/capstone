import React from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import InjectedLoginForm from './InjectedLoginForm';

const LoginForm = ({ history }) => {

  return (
    <div class="org-background">
      <div class="container">
        <div class="row">
          <div class="col-lg-12" >
            <div class="card mt-4 card-body">
              <StripeProvider apiKey='pk_test_AhLiCUGnPSZ5IySTH3Givqd0'>
                <Elements>
                  <InjectedLoginForm history={history} url={location.hash.slice(1)} />
                </Elements>
              </StripeProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm;
