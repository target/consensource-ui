import React, { useState } from 'react';
import { FormProps } from 'view/widgets/forms';

export interface LoginFormState {
  username: string;
  password: string;
}

export default function LoginForm({
  onSubmit,
  onSubmitBtnLabel = 'Login',
}: FormProps) {
  const [login, setLogin] = useState<LoginFormState>({
    username: '',
    password: '',
  });

  const onClick = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(login);
  };

  return (
    <form>
      <div>
        <label htmlFor="username">
          username
          <input
            value={login.username}
            onChange={(e) => setLogin({ ...login, username: e.target.value })}
            placeholder="username"
            type="text"
            id="username"
            required
          />
        </label>
      </div>

      <div>
        <label htmlFor="password">
          password
          <input
            value={login.password}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            placeholder="password"
            type="text"
            id="password"
            required
          />
        </label>
      </div>

      <button type="submit" onClick={onClick}>
        {onSubmitBtnLabel || 'Login'}
      </button>
    </form>
  );
}
