"use strict";

class Form extends React.Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        e.preventDefault()

        console.log('Clicando em submit')
    }

    render(){
        return (
            <form action="POST" onSubmit={this.handleSubmit}>
                <Input type="text" name="email" placeholder="Email" />
                <Input type="password" name="password" placeholder="Password" />
                <Input type="password" name="confirmPassword" placeholder="Password" />
                <Input type="submit" value="ENTRAR" />
            </form>
        );
    }
}

const root = ReactDOM.createRoot(document.querySelector('#form'))
root.render(<Form />)