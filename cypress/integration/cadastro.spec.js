import SignupPage from '../pages/SignupPage' // esta na pasta integration, vai subir 2 linhas e ir para a pasta cypress com a barra /import SignupPages from '../pages/SignupPage'

describe('Cadastro', ()=>{

    var signup = new SignupPage()

    beforeEach(function() {
        cy.fixture('deliver').then((d)=>{
            this.deliver = d
        })
    })

    it('Usuário deve se tornar um entregador', function() {
       
        signup.go()
        signup.fillForm(this.deliver.signup)
        signup.submit()
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)
            
    })

    it('Email incorreto', function() {
       
        signup.go()
        signup.fillForm(this.deliver.email_inv)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')

    })
    
    it('Campos obrigatórios', function(){
        signup.go()
        signup.submit()
        signup.alertMessageShouldBe('É necessário informar o nome')
        signup.alertMessageShouldBe('É necessário informar o CPF')
        signup.alertMessageShouldBe('É necessário informar o email')
        signup.alertMessageShouldBe('É necessário informar o CEP')
        signup.alertMessageShouldBe('É necessário informar o número do endereço')
        signup.alertMessageShouldBe('Selecione o método de entrega')
        signup.alertMessageShouldBe('Adicione uma foto da sua CNH')
        
    })
})      