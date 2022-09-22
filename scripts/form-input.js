"use strict"

class Input extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <input className="form-input" type={this.props.type} name={this.props.name} id={this.props.name} value={this.props.value} placeholder={this.props.placeholder}/>
        )
    }
}
