"use strict"

class SearchBar extends React.Component{
    constructor(props){
        super(props)
    }    

    render(){
        return(
            <Input type="text" name="search-bar" id="search-bar-input" placeholder="Buscar produtos" />
        );
    }
}

function SearchBarIcon(props) {
  return (
    <svg id="search-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 40 40"
    >
      <path
        fill="#8A817C"
        d="M34.516 32.15l-5.667-5.65a13.2 13.2 0 002.817-8.167 13.333 13.333 0 10-13.334 13.333A13.2 13.2 0 0026.5 28.85l5.65 5.666a1.666 1.666 0 002.367 0 1.666 1.666 0 000-2.366zM8.332 18.333a10 10 0 1120 0 10 10 0 01-20 0z"
      ></path>
    </svg>
  );
}


const root = ReactDOM.createRoot(document.querySelector('#search-box'))
root.render(<SearchBar />)




//<input type="text" placeholder="Buscar produtos">
//<img id="search-icon" src="../images/search-icon.svg" alt="Lupa">