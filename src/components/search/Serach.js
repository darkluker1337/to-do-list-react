import { Component, Fragment } from "react";
import './search.css'

export class Search extends Component{
    render(){
        const {search} = this.props
        return(
            <div className="search">
                <input className="searchInput" placeholder='search' onChange={search}></input>
            </div>
            
        )
    }
}