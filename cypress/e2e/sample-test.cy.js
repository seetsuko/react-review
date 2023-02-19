describe('login test', () => {
  it('login check', () => {
      cy.visit('http://localhost:3000/')  // URL

      cy.get('#login-email').type('dummy@email.com')  // 適当なメールアドレスを渡す
      cy.get('#login-password').type('asdfghjk')  // 適当なパスワードを渡す
      cy.get('#submit').click()  // 登録ボタンを押す
        if("#login-email".length == 0){
          // 未入力の場合にエラーメッセージ
          cy.get('.error-message').should('have.text', 'ログインに失敗しました')
        }else if("#login-email".length <= 1){
          // 入力があればエラーメッセージなし
          cy.get('.error-message').should('have.text', '')
        }
  })
})