import React,{Component} from "react";
import styles from "./index.scss";
import ReactSwipe from 'react-swipe';
import {connect} from "react-redux";

class Detail extends Component{
	constructor(){
		super();
		this.state={
			details:[],
			detaillist:{},
			descContentList:[]
		}
	}


 	 componentDidMount() {
 	    
 	     axios.get(`/api/detail?id=${this.props.match.params.id}&normal=1`).then(res=>{
 	     	this.setState({
 	     		details:res.data.data.detail.photo,
 	     		detaillist:res.data.data.detail,
 	     		descContentList:res.data.data.detail.descContentList
 	     	})
 	     	this.props.changetitle('ccc');
 	   })
 	 }

	render(){
		return <div>
				<ReactSwipe className="carousel" swipeOptions={{continuous: true,auto:2000}} key={this.state.details.length}>
		            {
		             	this.state.details.map(item=>
                		<img src={item.url} key={item.id}/>)
                	}
		        </ReactSwipe>
		        <div className={styles.titl}>
		        	{this.state.detaillist.title}
		        </div>
		        <div>
					<div className={styles.price}>用券后<span>￥{this.state.detaillist.price}</span></div>
					<div className={styles.ori}>原价<span>{this.state.detaillist.originPrice}</span></div>
					<span className={styles.sale}>
						月销量：{this.state.detaillist.saleNum}
					</span>
					{
						this.state.descContentList.map(item=>{
							if(item.type==1){
								return <img src={item.image.url}/>
							}
						})
					}
		        </div>
		</div>
	}
}

export default connect(
		null,

		{
			changetitle:(ccc)=>{
				return {
					type:"CHANGE_TITLE",
					payload:ccc

				}
			}
		}	

)(Detail);