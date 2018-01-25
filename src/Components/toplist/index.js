import React,{Component} from "react";
import styles from "./index.scss";
import ReactSwipe from 'react-swipe';




class toplist extends Component{
	constructor(){
		super();
		this.state={
			topList:[]
		}
	}

 	 componentDidMount() {
 	     axios.get("/api/tab/1?start=0").then(res=>{
 	     	this.setState({
 	     		topList:res.data.data.topList
 	     	})

 	   })


 	 }

	render(){
		return <div>
					<div className={styles.head}>
						<p>每日排行榜</p>
						<p>查看全部></p>
					</div>	
					<ReactSwipe className="carousel" swipeOptions={{continuous:true}} key={this.state.topList.length}>
					<div>
					<div className={styles.all}>
						{
							this.state.topList.map(item=><div className={styles.sec} key={item.id}>
								<img src={item.image}/>
								<p>{item.title}</p>
								<span>￥{item.price}</span>
								<span>{item.saleNum}人已买</span>
							</div>)
					    }
					 </div>
					 </div>
					 </ReactSwipe>
			   </div>
	}
}

export default toplist;