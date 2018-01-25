import React,{Component} from "react";
import styles from "./index.scss";
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from "react-redux";




class Sale9 extends Component{
	constructor(){
		super();
		this.state={
			feeds:[],
			feedss:{},
			miao:{},
			miaos:[],
			mian:[],
			loading:true
		}
		this.current=0; 
		this.code = 200;

	}

 	 componentDidMount() {
 	 	if(this.props.match.params.id==401){
 	 	axios.get("/api/sub_column/7/items?start=0").then(res=>{
 	     	this.setState({
 	     		feeds:res.data.data.list
 	     	})
 	   })
 	 	 axios.get("/api/column/29").then(res=>{
 	     	this.setState({
 	     		feedss:res.data.data
 	     	})
 	     	this.props.changetitle(res.data.data)
 	     })
 	 	}else if(this.props.match.params.id==402){
 	 			axios.get("/api/column/170").then(res=>{
 	 		    	this.setState({
 	 		    		miao:res.data.data
 	 		    	})
 	 		  })
 	 		  	axios.get('/api/column/170/items?start=30').then(res=>{
 	 		      	this.setState({
 	 		      		miaos:res.data.data.list
 	 		      	})
 	 		      })
 	 	}else{
 	 			axios.get("/api/category/1788/items?start=0").then(res=>{
 	 		    	this.setState({
 	 		    		mian:res.data.data.items.list
 	 		    	})
 	 		  })
 	 	}



 	 }

 	 	render(){
 	 		if(this.props.match.params.id==401){
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
 	 								this.state.feeds.map(item=>
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
 	 		}else if(this.props.match.params.id==402){
 	 			return <div>
 	 			<img src={this.state.miao.cover}/>
 	 			<div>{this.state.miao.description}</div>
 	 			<InfiniteScroll
 	 			    initialLoad={false}
 	 			    threshold={10}
 	 			    loadMore={this.loaderMoreFunc.bind(this)}
 	 			    hasMore={this.state.loading}
 	 			    loader={<div className="loader">Loading ...</div>}
 	 			>
					<ul>
						{
							this.state.miaos.map(item=>
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
 	 			
 	 		}else{
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
 	 									this.state.mian.map(item=>
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
 	 		
 	 	}
 	handleclick(id){
		this.props.history.push(`/detail/${id}`);
	}

	loaderMoreFunc(){
 	 		this.current+=30

 	 		if(this.current>this.code){
 	 			this.setState({
 	 				loading:false
 	 			})
 	 			return ;
 	 		}
 	 		if(this.props.match.params.id==401){
 	 				axios.get(`/api/sub_column/7/items?start=${this.current}`).then(res=>{
 	 			    	this.setState({
 	 			    		feeds:[...this.state.feeds,...res.data.data.list]
 	 			    	})
 	 			    })

 	 			}else if(this.props.match.params.id==402){
 	 					axios.get(`/api/column/170/items?start=${30+this.current}`).then(res=>{
 	 				    	this.setState({
 	 				    		miaos:[...this.state.miaos,...res.data.data.list]
 	 				    	})
 	 				    })

 	 			}else{
 	 					axios.get(`/api/category/1788/items?start=${this.current}`).then(res=>{
 	 				    	this.setState({
 	 				    		mian:[...this.state.mian,...res.data.data.items.list]
 	 				    	})
 	 				    })

 	 			}
 	 	}
 	 }
export default connect(
		null,

		{
			changetitle:(name)=>{
				return {
					type:"CHANGE_TITLE",
					payload:name

				}
			}
		}	

)(Sale9);