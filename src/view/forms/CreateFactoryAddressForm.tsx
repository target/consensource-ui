import React from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import { FormProps } from 'view/forms';
import { Factory } from 'services/protobuf';

function createStore() {
  return {
    streetLine_1: '',
    streetLine_2: '',
    city: '',
    stateProvince: '',
    country: '',
    postalCode: '',
  } as consensource.Factory.IAddress;
}

interface CreateContactFormProps extends FormProps {
  onSubmit: (address: consensource.Factory.Address) => any;
}

function CreateFactoryAddressForm({
  onSubmit,
  onError,
  onSubmitBtnLabel = 'Create Factory',
}: CreateContactFormProps) {
  const state = useLocalStore(createStore);

  /**
   * Create a user and an agent from the form info
   */
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const factoryAddress = new Factory.Address(state);

      if (onSubmit) {
        onSubmit(factoryAddress);
      }
    } catch ({ message }) {
      if (onError) {
        onError(message);
      }
    }
  };

  const setState = <T extends keyof consensource.Factory.IAddress>(
    key: T,
    val: consensource.Factory.IAddress[T],
  ) => {
    state[key] = val;
  };

  return (
    <form>
      <div>
        <label htmlFor="factory-street-line-1">
          Street Line 1
          <input
            value={state.streetLine_1 || ''}
            onChange={(e) => setState('streetLine_1', e.target.value)}
            placeholder="Street Line 1"
            type="text"
            id="factory-street-line-1"
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="factory-street-line-2">
          Street Line 2
          <input
            value={state.streetLine_2 || ''}
            onChange={(e) => setState('streetLine_2', e.target.value)}
            placeholder="Street Line 2"
            type="text"
            id="factory-street-line-2"
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="factory-city">
          City
          <input
            value={state.city || ''}
            onChange={(e) => setState('city', e.target.value)}
            placeholder="City"
            type="text"
            id="factory-city"
            required
          />
        </label>
        <div>
          <label htmlFor="factory-state-province">
            State Province
            <input
              value={state.stateProvince || ''}
              onChange={(e) => setState('stateProvince', e.target.value)}
              placeholder="State Province"
              type="text"
              id="factory-state-province"
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="factory-country">
            Country
            <input
              value={state.country || ''}
              onChange={(e) => setState('country', e.target.value)}
              placeholder="Country"
              type="text"
              id="factory-country"
              required
            />
          </label>
        </div>

        <div>
          <label htmlFor="factory-postal-code">
            Postal Code
            <input
              value={state.postalCode || ''}
              onChange={(e) => setState('postalCode', e.target.value)}
              placeholder="PostalCode"
              type="number"
              id="factory-postal-code"
              required
            />
          </label>
        </div>
      </div>

      <button type="submit" onClick={submit}>
        {onSubmitBtnLabel}
      </button>
    </form>
  );
}

export default observer(CreateFactoryAddressForm);
