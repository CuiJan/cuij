import React,{Component} from "react";
import styles from "./index.scss";
import {connect} from "react-redux";




class Gird extends Component{
	constructor(){
		super();
		this.state={
			girds:[]
		}
	}

 	 componentDidMount() {
 	     axios.get("/api/tab/1?start=0").then(res=>{
 	     	this.setState({
 	     		girds:res.data.data.gridsV2
 	     	})

 	   })


 	 }

	render(){
		return <div>							
		          	<div className={styles.all}>
		          		{this.state.girds.map(item=><div key={item.id} onClick={this.handleclick.bind(this,item.id)}>
		          				<p>{item.title}</p>
			          			<p>{item.text}</p>
			          			<img src={item.imageUrl}/>
		          			</div>)}
		          	</div>
			   </div>
	}
	handleclick(id){
		this.props.history.push(`/sale9/${id}`);
	}
}

export default connect((state)=>{
		return {
			mytitle:state.changetitleReducer
		}
	},

	null,
	)(Gird);