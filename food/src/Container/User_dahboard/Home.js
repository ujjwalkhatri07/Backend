import React, { Component } from 'react'
import Category from './Category';
import Popular from './popular';
import Restaurant from './Restaurant';


export default class Home extends Component {
    render() {
        return (
            <div>
           
                <Category />
                <Popular />
                <hr/>
                <Restaurant/>
            
            </div>
        )
    }
}
