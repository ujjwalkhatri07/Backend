import { Component } from "react";

import {Route} from 'react-router-dom'
import Register from './Register'
import Login from "./Login";
import Logout from "./Logout";
import RestaurantRequest from "./RestaurantRequest";
import ViewRestaurantRequest from './ViewRestaurantRequest';
import ListFoods from './FoodCategory';
import AddRestuarant from './Restaurant';
import AddFood from "./Foods";
import Category from "./User_dahboard/Category";
import Popular from "./User_dahboard/popular";
import Resturantdetails from "./User_dahboard/Foods";
import Restaurant from "./User_dahboard/Restaurant";
import Home from "./User_dahboard/Home";
import Cart from "./User_dahboard/Viewcart";
import Profile from "./User_dahboard/Profile";
import ViewOrder from "./User_dahboard/vieworder";
class Container extends Component{
    render(){
     
        return(
            <div className="">
                <div className=''>
                    <div className=''>
                  <Route path="/users/signup" component={Register} />
                  <Route path="/users/login" component={Login} />
                  <Route path="/users/logout" component={Logout} />
                  <Route path='/restaurant/register' component={RestaurantRequest} />
                  <Route path='/user/show' component={ViewRestaurantRequest} />
                  <Route path='/food/cat' component={ListFoods} />
                  <Route path='/restaurant/add' component={AddRestuarant} />
                  <Route path='/add/food' component={AddFood} />
                  <Route path='/category' component={Category}/>
                  <Route path='/popular' component={Popular}/>
                  <Route path='/viewRes/:id' component={Resturantdetails}/>
                  <Route path='/resturant' component={Restaurant}/>
                  <Route path="/home" component={Home} />
                  <Route path="/view/carts" component={Cart} />
                  <Route path="/user/single" component={Profile} />
                  <Route path="/view/order" component={ViewOrder} />
                   </div>
                   
                   </div>
            </div>
            
        )
    }
}

export default Container