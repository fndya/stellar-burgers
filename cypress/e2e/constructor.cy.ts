describe('Страница конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
        fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/api/auth/user', {
        statusCode: 401,
        body: {
        success: false,
        message: 'You should be authorised'
        }
    }).as('getUser');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('добавляет булку и начинку в конструктор', () => {
    cy.contains('Краторная булка N-200i')
      .parent()
      .contains('Добавить')
      .click();

    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .contains('Добавить')
      .click();

    cy.get('[data-cy="constructor-bun-top"]').should('contain', 'Краторная булка N-200i');
    cy.get('[data-cy="constructor-bun-bottom"]').should('contain', 'Краторная булка N-200i');
    cy.get('[data-cy="constructor-filling"]').should('contain', 'Биокотлета из марсианской Магнолии');
  });

  it('открывает и закрывает модальное окно ингредиента', () => {
    cy.contains('Краторная булка N-200i').click();

    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modal"]').should('contain', 'Краторная булка N-200i');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('создаёт заказ', () => {
    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json'
    }).as('getUserAuthorized');

    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'test-refresh-token');
    });

    cy.setCookie('accessToken', 'test-access-token');

    cy.contains('Краторная булка N-200i')
      .parent()
      .contains('Добавить')
      .click();

    cy.contains('Биокотлета из марсианской Магнолии')
      .parent()
      .contains('Добавить')
      .click();

    cy.get('[data-cy="order-button"]').click();

    cy.wait('@createOrder');
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="order-number"]').should('contain', '12345');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="constructor-filling"]').should('not.exist');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.window().then((win) => {
      win.localStorage.removeItem('refreshToken');
    });
  });
});
