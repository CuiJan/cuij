
import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
}from 'react-router-dom';



import App from "@/Components/App";
import Home from "@/Components/Home";
import Search from "@/Components/search";
import Sale9 from "@/Components/9kuai9";
import Detail from "@/Components/Detail";
import Cricle from "@/Components/Cricle";
import Picture from "@/Components/Picture";
import Searchd from "@/Components/Searchd";
import List from "@/Components/List";
import Listdetail from "@/Components/Listdetail";



import {Provider} from "react-redux";
import store from "@/Redux/Store";




const router=(
	<Provider store={store}>
	<Router>
		<App>
		<Switch>
			<Route path="/tab1" component={Home}/>
			<Route path="/tab/:id" component={List}/>
			<Route path="/search" component={Search}/>
			<Route path="/sale9/:id" component={Sale9}/>
			<Route path="/detail/:id" component={Detail}/>
			<Route path="/Listdetail/:id" component={Listdetail}/>
			<Route path="/picture/:id/:ids" component={Picture}/>
			<Route path="/cricle/:id/:ids" component={Cricle}/>
			<Route path="/searchd" component={Searchd}/>
			<Redirect from="/" to="/tab1"/>
		</Switch>
		</App>
	</Router>
	</Provider>
	)





export  default router;