import React,{Component} from "react";
import styles from "./index.scss";
import InfiniteScroll from 'react-infinite-scroller';
class Picture extends Component{
	constructor(){
		super();
		this.state={
			circle:{},
			circles:[],
			cirs:[],
			loading:true

		}
		this.current=0; 
		this.code =60;

	}
	componentDidMount(){
		if(this.props.match.params.id=='column'){
			axios.get(`/api/${this.props.match.params.id}/${this.props.match.params.ids}`).then(res=>{
				console.log(res.data.data)
				this.setState({
					circle:res.data.data.share
				})
			})
			axios.get(`/api/${this.props.match.params.id}/${this.props.match.params.ids}/items?start=0`).then(res=>{
				console.log(res.data.data)
				this.setState({
					circles:res.data.data.list
				})
			})

		}else if(this.props.match.params.id=='article'){
			axios.get(`/api/${this.props.match.params.id}/${this.props.match.params.ids}`).then(res=>{
				console.log(res.data.data.contentList)
				this.setState({
					circle:res.data.data.share,
					cirs:res.data.data.contentList
				})
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
										<span>{item.price}</span>
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
					<p className={styles.texts}>{this.state.cirs[0]}</p>
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

export default Picture;