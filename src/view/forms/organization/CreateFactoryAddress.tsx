import React from 'react';
import { useLocalStore, observer } from 'mobx-react-lite';
import { FormProps, hasEmptyFields } from 'view/forms';
import { createFactoryAddress } from 'services/protobuf/organization';
import { Factory } from 'services/protobuf/compiled';

function createStore() {
  const store: Factory.IAddress = {
    street_line_1: '',
    street_line_2: '',
    city: '',
    state_province: '',
    country: '',
    postal_code: '',
  };

  return store;
}

interface CreateContactFormProps extends FormProps {
  onSubmit: (address: Factory.Address) => any;
}

/**
 * Form to create a `Factory.Address` proto object
 */
function CreateFactoryAddressForm({
  onSubmit,
  onSubmitBtnLabel = 'Create Factory',
}: CreateContactFormProps) {
  const state = useLocalStore(createStore);
  const isDisabled = hasEmptyFields(state);

  /**
   * Create a user and an agent from the form info
   */
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(createFactoryAddress(state));
  };

  const setState = <T extends keyof Factory.IAddress>(
    key: T,
    val: Factory.IAddress[T],
  ) => {
    state[key] = val;
  };

  return (
    <form>
      <div>
        <label htmlFor="factory-street-line-1">
          Street Line 1
          <input
            value={state.street_line_1 || ''}
            onChange={(e) => setState('street_line_1', e.target.value)}
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
            value={state.street_line_2 || ''}
            onChange={(e) => setState('street_line_2', e.target.value)}
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
              value={state.state_province || ''}
              onChange={(e) => setState('state_province', e.target.value)}
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
              value={state.postal_code || ''}
              onChange={(e) => setState('postal_code', e.target.value)}
              placeholder="Postal Code"
              type="number"
              id="factory-postal-code"
              required
            />
          </label>
        </div>
      </div>

      <button type="submit" onClick={submit} disabled={isDisabled}>
        {onSubmitBtnLabel}
      </button>
    </form>
  );
}

export default observer(CreateFactoryAddressForm);