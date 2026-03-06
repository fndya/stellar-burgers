import { FC, SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import { login } from '../../slices/user';
import { selectUserError, selectUserLoading } from '../../services/selectors';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const errorText = useSelector(selectUserError) || '';
  const loading = useSelector(selectUserLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (loading) return;

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        const from = (location.state as any)?.from?.pathname;
        navigate(from || '/', { replace: true });
      })
      .catch(() => {
        // ошибка уже в сторе
      });
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
