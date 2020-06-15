import React, { useState } from 'react';
import { FormProps, hasEmptyFields } from 'view/widgets/forms';
import {
  createFactoryAddress,
  IFactoryAddressStrict,
} from 'services/protobuf/organization';
import { Factory } from 'services/protobuf/compiled';

interface CreateContactFormProps extends FormProps {
  onSubmit: (address: Factory.Address) => any;
}

/**
 * Form to create a `Factory.Address` proto object
 */
export default function CreateFactoryAddressForm({
  onSubmit,
  onSubmitBtnLabel = 'Create Factory',
}: CreateContactFormProps) {
  const [address, setAddress] = useState<IFactoryAddressStrict>({
    street_line_1: '',
    street_line_2: '',
    city: '',
    state_province: '',
    country: '',
    postal_code: '',
  });

  /**
   * Create a user and an agent from the form info
   */
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(createFactoryAddress(address));
  };

  return (
    <form>
      <div>
        <label htmlFor="factory-street-line-1">
          Street Line 1
          <input
            value={address.street_line_1}
            onChange={(e) =>
              setAddress({ ...address, street_line_1: e.target.value })
            }
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
            value={address.street_line_2}
            onChange={(e) =>
              setAddress({ ...address, street_line_2: e.target.value })
            }
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
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
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
              value={address.state_province}
              onChange={(e) =>
                setAddress({ ...address, state_province: e.target.value })
              }
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
              value={address.country}
              onChange={(e) =>
                setAddress({ ...address, country: e.target.value })
              }
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
              value={address.postal_code}
              onChange={(e) =>
                setAddress({ ...address, postal_code: e.target.value })
              }
              placeholder="Postal Code"
              type="number"
              id="factory-postal-code"
              required
            />
          </label>
        </div>
      </div>

      <button type="submit" onClick={submit} disabled={hasEmptyFields(address)}>
        {onSubmitBtnLabel}
      </button>
    </form>
  );
}
