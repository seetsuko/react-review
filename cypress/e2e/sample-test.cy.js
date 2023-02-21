describe('login test', () => {
  it('login clear', () => {
      cy.visit('http://localhost:3000/')  // URL

      cy.get('#login-email').type('dummy@email.com')  // 適当なメールアドレスを渡す
      cy.get('#login-password').type('asdfghjk')  // 適当なパスワードを渡す
      cy.get('#submit').click()  // 登録ボタンを押す
      cy.get('.error-message').should('have.text', '')
  })
  it('login email error', () => {
    cy.visit('http://localhost:3000/')  // URL
    cy.get('#login-password').type('asdfghjk')  // 適当なパスワードを渡す
    cy.get('#submit').click()  // 登録ボタンを押す
    cy.get('.error-message').should('have.text', 'ログインに失敗しました')
  })
  it('login password error', () => {
    cy.visit('http://localhost:3000/')  // URL
    cy.get('#login-email').type('dummy@email.com')  // 適当なメールアドレスを渡す
    cy.get('#submit').click()  // 登録ボタンを押す
    cy.get('.error-message').should('have.text', 'ログインに失敗しました')
  })
})