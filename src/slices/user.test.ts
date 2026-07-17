import userReducer, {
  login,
  register,
  apiGetUser,
  updateUser,
  logout
} from './user';

describe('user reducer', () => {
  const userPayload = {
    email: 'test@test.ru',
    name: 'Федор'
  };

  it('должен обрабатывать login.pending', () => {
    const state = userReducer(undefined, login.pending('', {
      email: 'test@test.ru',
      password: '123456'
    }));

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обрабатывать login.fulfilled', () => {
    const payload = {
      success: true,
      user: userPayload
    };

    const state = userReducer(
      undefined,
      login.fulfilled(payload as any, '', {
        email: 'test@test.ru',
        password: '123456'
      })
    );

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(userPayload);
    expect(state.error).toBeNull();
  });

  it('должен обрабатывать login.rejected', () => {
    const state = userReducer(
      undefined,
      login.rejected(new Error('Ошибка входа'), '', {
        email: 'test@test.ru',
        password: '123456'
      })
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка входа');
  });

  it('должен обрабатывать register.pending', () => {
    const state = userReducer(undefined, register.pending('', {
      email: 'test@test.ru',
      password: '123456',
      name: 'Федор'
    }));

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обрабатывать register.fulfilled', () => {
    const payload = {
      success: true,
      user: userPayload
    };

    const state = userReducer(
      undefined,
      register.fulfilled(payload as any, '', {
        email: 'test@test.ru',
        password: '123456',
        name: 'Федор'
      })
    );

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(userPayload);
    expect(state.error).toBeNull();
  });

  it('должен обрабатывать register.rejected', () => {
    const state = userReducer(
      undefined,
      register.rejected(new Error('Ошибка регистрации'), '', {
        email: 'test@test.ru',
        password: '123456',
        name: 'Федор'
      })
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка регистрации');
  });

  it('должен обрабатывать apiGetUser.pending', () => {
    const state = userReducer(undefined, apiGetUser.pending('', undefined));

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обрабатывать apiGetUser.fulfilled', () => {
    const payload = {
      success: true,
      user: userPayload
    };

    const state = userReducer(
      undefined,
      apiGetUser.fulfilled(payload as any, '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(userPayload);
    expect(state.error).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен обрабатывать apiGetUser.rejected', () => {
    const state = userReducer(
        undefined,
        apiGetUser.rejected(new Error('Ошибка получения пользователя'), '', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });
  it('должен обрабатывать updateUser.pending', () => {
    const state = userReducer(undefined, updateUser.pending('', {
      email: 'test@test.ru',
      name: 'Федор'
    }));

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обрабатывать updateUser.fulfilled', () => {
    const payload = {
      success: true,
      user: {
        email: 'new@test.ru',
        name: 'Новый Федор'
      }
    };

    const state = userReducer(
      undefined,
      updateUser.fulfilled(payload as any, '', {
        email: 'new@test.ru',
        name: 'Новый Федор'
      })
    );

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(payload.user);
    expect(state.error).toBeNull();
  });

  it('должен обрабатывать updateUser.rejected', () => {
    const state = userReducer(
      undefined,
      updateUser.rejected(new Error('Ошибка обновления пользователя'), '', {
        email: 'new@test.ru',
        name: 'Новый Федор'
      })
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка обновления пользователя');
  });

  it('должен обрабатывать logout.fulfilled', () => {
    const initialState = {
      user: userPayload,
      loading: false,
      error: null,
      isAuthChecked: true
    };

    const payload = {
      success: true,
      message: 'Successful logout'
    };

    const state = userReducer(
      initialState as any,
      logout.fulfilled(payload as any, '', undefined)
    );

    expect(state.user).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });
});
