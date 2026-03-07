import { FC, SyntheticEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RegisterUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import { register } from '../../slices/user';
import { selectUserError, selectUserLoading } from '../../services/selectors';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const errorText = useSelector(selectUserError) || '';
  const loading = useSelector(selectUserLoading);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (loading) return;

    dispatch(register({ name, email, password }))
      .unwrap()
      .then(() => {
        const from = (location.state as any)?.from?.pathname;
        navigate(from || '/', { replace: true });
      })
      .catch(() => {});
  };

  return (
    <RegisterUI
      errorText={errorText}
      userName={name}
      setUserName={setName}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
