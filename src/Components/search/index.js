import React,{Component} from "react";
import styles from "./index.scss";
import {connect} from "react-redux";




class Search extends Component{
	constructor(){
		super();
		this.state={
			sears:[]
		}
	}

 	 componentDidMount() {
 	     axios.get("/api/hotWords").then(res=>{
 	     	this.setState({
 	     		sears:res.data.data
 	     	})
 	     	this.props.changetitle('bbb');

 	   })


 	 }

	render(){
		return <div>							
		          	<div className={styles.alls}>
		          		{this.state.sears.map(item=><p className={styles.ps} key={item.id}>{item}</p>
		          			)}
		          	</div>
			   </div>
	}
}

export default connect(
		null,

		{
			changetitle:(bbb)=>{
				return {
					type:"CHANGE_TITLE",
					payload:bbb

				}
			}
		}	

)(Search);