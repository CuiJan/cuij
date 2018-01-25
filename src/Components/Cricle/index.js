import React,{Component} from "react";
import styles from "./index.scss";
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from "react-redux";
class Cricle extends Component{
	constructor(){
		super();
		this.state={
			circle:{},
			circles:[],
			cirs:[],
			loading:true

		}
		this.current=0; 
		this.code = 60;

	}
	componentDidMount(){
		if(this.props.match.params.id=='column'){
			axios.get(`/api/${this.props.match.params.id}/${this.props.match.params.ids}`).then(res=>{
				console.log(res.data.data)
				this.setState({
					circle:res.data.data.share
				})
				this.props.changetitle('aaa');
			})
			axios.get(`/api/${this.props.match.params.id}/${this.props.match.params.ids}/items?start=0`).then(res=>{
				console.log(res.data.data)
				this.setState({
					circles:res.data.data.list
				})
				this.props.changetitle('aaa');
			})

		}else if(this.props.match.params.id=='article'){
			axios.get(`/api/${this.props.match.params.id}/${this.props.match.params.ids}`).then(res=>{
				console.log(res.data.data.contentList)
				this.setState({
					circle:res.data.data.share,
					cirs:res.data.data.contentList,
				})
				this.props.changetitle('aaa');
			})

		}
	}

	render(){
		if(this.props.match.params.id=='column'){
			return<div>
					<img src={this.state.circle.imageUrl}/>
					<InfiniteScroll
					    initialLoad={false}
					    threshold={10}
					    loadMore={this.loaderMoreFunc.bind(this)}
					    hasMore={this.state.loading}
					    loader={<div className="loader">Loading ...</div>}
					>
					{
						<ul>
							{
								this.state.circles.map(item=>
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
					}
										</InfiniteScroll>

				</div>

		}else if(this.props.match.params.id=='article'){
			return<div>
					<img src={this.state.circle.imageUrl}/>
					<p className={styles.day}>{this.state.circle.title}</p>

					{
						<ul>
							{
								this.state.cirs.map(item=>{
									if(item.type==4){
										return <li key={item.commodity.id} className={styles.limore} onClick={this.handleclick.bind(this,item.commodity.id)}>
											<img src={item.commodity.image}/>
											<p>{item.commodity.title}</p>
											<div className={styles.divmore}>
												{item.commodity.price?<span>￥{item.commodity.price}</span>:null}
												<span>{item.commodity.originPrice}</span>
												<span className={item.commodity.couponValue?styles.aaa:styles.bbb}>{item.commodity.couponValue}</span>
											</div>
										</li>
									}else if(item.type==1){
										return <p className={styles.type1}>
												{item.text}
										</p>
									}else if(item.type==2){
										return <p className={styles.type2}>
											{item.title}		
										</p>
									}else if(item.type==3){
										return <div className={styles.type3div}><img src={item.image.url} className={styles.type3}/></div>
									}
								})
							}
							
						</ul>
					}
				</div>

		}
	}
	handleclick(id){
		this.props.history.push(`/detail/${id}`);
	}
	loaderMoreFunc(){
		this.current+=30
		if(this.current>=this.code){
			this.setState({
				loading:false
			})
			return ;
		}
		axios.get(`/api/${this.props.match.params.id}/${this.props.match.params.ids}/items?start=${this.current}`).then(res=>{
	    	this.setState({
	    		circles:[...this.state.circles,...res.data.data.list]
	    	})
	    })
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

)(Cricle);