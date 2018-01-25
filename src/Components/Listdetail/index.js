import React,{Component} from "react";
import styles from "./index.scss";
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from "react-redux";





class Listdetail extends Component{
	constructor(){
		super();
		this.state={
			moreList:[],
			loading:true
		}
		this.current=0; 
		this.code = 200;
	}

 	 componentDidMount() {
 	     axios.get(`/api/category/${this.props.match.params.id}/items?start=0`).then(res=>{
 	     	this.setState({
 	     		moreList:res.data.data.items.list
 	     	})
 	   })


 	 }

	render(){
		return <div>
		<InfiniteScroll
		    initialLoad={false}
		    threshold={10}
		    loadMore={this.loaderMoreFunc.bind(this)}
		    hasMore={this.state.loading}
		    loader={<div className="loader">Loading ...</div>}
		>
					<ul>
						{
							this.state.moreList.map(item=>
							<li key={item.id} className={styles.limore} onClick={this.handleclick.bind(this,item.id)}>
								<img src={item.image}/>
								<p>{item.title}</p>
								<div className={styles.divmore}>
									{item.price?<span>￥{item.price}</span>:null}
									<span>{item.originPrice}</span>
									<span className={item.couponValue?styles.aaa:styles.bbb}>{item.couponValue}</span>
								</div>
							</li>)
						}
					</ul>
			</InfiniteScroll>

			   </div>
	}

	handleclick(id){
			this.props.history.push(`/detail/${id}`);
		}
	
		loaderMoreFunc(){
		console.log("到底部了");


		this.current+=30

		if(this.current>this.code){
			this.setState({
				loading:false
			})
			return ;
		}
		axios.get(`/api/tab/1/feeds?start=${this.current}`).then(res=>{
	    	this.setState({
	    		moreList:[...this.state.moreList,...res.data.data.list]
	    	})
	    })
	}


}

export default connect((state)=>{
		return {
			mytitle:state.changetitleReducer
		}
	},

	null,
	)(Listdetail);