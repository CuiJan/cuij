import React,{Component} from "react";
import "./index.scss";
import ReactSwipe from 'react-swipe';
import Gird from '@/Components/gird';
import Toplist from '@/Components/toplist';
import More from '@/Components/more';
import BackTop from '@/Components/Back';

import {connect} from "react-redux";

class Home extends Component{
	constructor(){
		super();
		this.state={
			list:[],
		}
	}


 	 componentDidMount() {
 	     axios.get("/api/tab/1?start=0").then(res=>{
 	     	this.setState({
 	     		list:res.data.data.banners,
 	     	})
 	     	this.props.changetitle('aaa');
 	   })
 	 }
	render(){
		return <div>
				<ReactSwipe className="carousel" swipeOptions={{continuous: true,auto:2000}} key={this.state.list.length}>
		            {
		             	this.state.list.map(item=>
                		<img src={item.imageUrl} key={item.id} onClick={this.handleclick.bind(this,item.url)}/>)
                	}
		        </ReactSwipe>
		        <Gird {...this.props}></Gird>
		        <Toplist></Toplist>
		        <More {...this.props}></More>
		        <BackTop></BackTop>
		</div>
	}
	handleclick(ids){
		this.props.history.push(`/cricle/${ids.split('//')[1].split('?')[0]}/${ids.split('//')[1].split('=')[1]}`);
	}

}

export default connect(
		null,

		{
			changetitle:(aaa)=>{
				return {
					type:"CHANGE_TITLE",
					payload:aaa

				}
			}
		}	

)(Home);