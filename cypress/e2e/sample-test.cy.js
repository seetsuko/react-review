describe('login test', () => {
  it('login check', () => {
      cy.visit('http://localhost:3000/')  // URL

      cy.get('#input-email').type('dummy@email.com')  // 適当なメールアドレスを渡す
      cy.get('#input-password').type('asdfghjk')  // 適当なパスワードを渡す
      cy.get('#submit').click()  // 登録ボタンを押す
        if("#input-email".length <= 0){
          cy.get('.error-message').should('have.text', 'ログインに失敗しました')
        }else{
          cy.get('.error-message').should('have.text', '')
        }
  })
})