import React,{Component} from "react";
import styles from "./index.scss";
import {connect} from "react-redux";
import InfiniteScroll from 'react-infinite-scroller';





class Searchd extends Component{
	constructor(){
		super();
		this.state={
			seard:[],
			sears:{},
			loading:true
		}
		this.current=0; 
		this.code = this.state.sears.total;
	}
	componentWillReceiveProps(nextProps){
		console.log(nextProps)
		  axios.get(`/api/search?word=${nextProps.myreducer}&start=0&sort=0`).then(res=>{
		  	console.log(this.props.myreducer)
		  	this.setState({
		  		sears:res.data.data,
		  		seard:res.data.data.list
		  	})
		  	this.props.changetitle('bbb');
		})

	}

 	 componentDidMount() {
 	     axios.get(`/api/search?word=${this.props.myreducer}&start=0&sort=0`).then(res=>{
 	     	console.log(this.props.myreducer)
 	     	this.setState({
 	     		sears:res.data.data,
 	     		seard:res.data.data.list
 	     	})
 	     	this.props.changetitle('bbb');

 	   })
 	 }
	render(){						
				return <div>
				<InfiniteScroll
				    initialLoad={false}
				    loadMore={this.loaderMoreFunc.bind(this)}
				    hasMore={this.state.loading}
				    loader={<div className="loader">loading...</div>}
				>
							<ul>
								{
									this.state.seard.map(item=>
									<li key={item.id} className={styles.limore} onClick={this.handleclick.bind(this,item.id,item.type,item.url)}>
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
			handleclick(id,type,url){
				if(type==1){
					this.props.history.push(`/detail/${id}`);
				}else if(type==2){
					 this.props.history.push(`/picture/${url.split('//')[1].split('?')[0]}/${url.split('//')[1].split('=')[1]}`);		
				}
			}
			loaderMoreFunc(){
				console.log("到底部了");
				this.current+=40
				if(this.current>this.code){
					this.setState({
						loading:false
					})
					return ;
				}
				axios.get(`/api/search?word=${this.props.myreducer}&start=${this.current}&sort=0`).then(res=>{
			    	this.setState({
			    		seard:[...this.state.seard,...res.data.data.list]
			    	})
			    })
			}

		}

export default connect((state)=>{
		return {
			myreducer:state.changevalueReducer
		}
	}
,
		{
			changetitle:(bbb)=>{
				return {
					type:"CHANGE_TITLE",
					payload:bbb

				}
			}
		}	

)(Searchd);