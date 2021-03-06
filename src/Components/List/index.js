import React,{Component} from "react";
import styles from "./index.scss";
import ReactSwipe from 'react-swipe';
import Gird from '@/Components/gird';
import Toplist from '@/Components/toplist';
import More from '@/Components/more';
import {connect} from "react-redux";
import InfiniteScroll from 'react-infinite-scroller';
import BackTop from '@/Components/Back';

class List extends Component{
	constructor(){
		super();
		this.state={
			list:[],
			lists:[],
		}
	}

	componentWillReceiveProps(nextProps){
		console.log(nextProps)
		  axios.get(`/api/tab/${nextProps.match.params.id}?start=0`).then(res=>{
		  	this.setState({
		  		list:res.data.data.items.list,
		  		lists:res.data.data.categories
		  	})
		  	this.props.changetitle('aaa');
		})

	}

 	 componentDidMount() {
 	     axios.get(`/api/tab/${this.props.match.params.id}?start=0`).then(res=>{
 	     	this.setState({
 	     		list:res.data.data.items.list,
 	     		lists:res.data.data.categories,
 	     	})
 	     	this.props.changetitle('aaa');
 	   })
 	 }
	render(){
		return <div >
		<ul className={styles.ullist}>
			{
				this.state.lists.map(item=>
					<li key={item.id} className={styles.lilist} onClick={this.handclick.bind(this,item.url)}>
						<img src={item.imageUrl}/>
						{item.title}
					</li>)
			}
			<div className={styles.allssss}></div>

		</ul>


		<InfiniteScroll
		    initialLoad={false}
		    threshold={10}
		    loadMore={this.loaderMoreFunc.bind(this)}
		    hasMore={this.state.loading}
		    loader={<div className="loader">Loading ...</div>}
		>
					<ul className={styles.ulmore}>
						{
							this.state.list.map(item=>
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
			<BackTop></BackTop>
			   </div>
	}

	handleclick(id,type,url){
		if(type==1){
			this.props.history.push(`/detail/${id}`);
		}else if(type==2){
			 this.props.history.push(`/picture/${url.split('//')[1].split('?')[0]}/${url.split('//')[1].split('=')[1]}`);		
		}
	}
	handclick(url){
		this.props.history.push(`/Listdetail/${url.split('=')[1]}`);
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
		axios.get(`/api/tab/${this.props.match.params.id}?start=0`).then(res=>{
	    	this.setState({
	    		list:[...this.state.list,...res.data.data.items.list]
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

)(List);