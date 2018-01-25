import React,{Component} from "react";
import styles from "./index.scss";
// import {NavLink} from "react-router-dom";
import Navber from '@/Components/Common';
import { browserHistory } from 'react-router' 



class App extends Component{
	constructor(){
		super();
	}

	render(){
		return <div>
			<Navber {...this.props}/>
			{this.props.children}
		</div>
	}
}

export default App;