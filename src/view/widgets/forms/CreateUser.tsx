import React, { useState } from 'react';
import { FormProps, hasEmptyFields } from 'view/widgets/forms';

export interface CreateUserFormState {
  username: string;
  password: string;
}

export default function CreateUserForm({
  onSubmit,
  onSubmitBtnLabel,
}: FormProps) {
  const [user, setUser] = useState<CreateUserFormState>({
    username: '',
    password: '',
  });

  /**
   * Create a user and an agent from the form info
   */
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(user);
  };

  return (
    <form>
      <div>
        <label htmlFor="user-username">
          username
          <input
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Username"
            type="text"
            id="user-username"
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="user-password">
          password
          <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
            type="text"
            id="user-password"
            required
          />
        </label>
      </div>

      <button type="submit" onClick={submit} disabled={hasEmptyFields(user)}>
        {onSubmitBtnLabel || 'Create User'}
      </button>
    </form>
  );
}
