import React,{Component} from "react";
import styles from "./index.scss";
import {NavLink} from "react-router-dom";
import ReactSwipe from 'react-swipe';
import {connect} from "react-redux";
import { browserHistory } from 'react-router'




class Navber extends Component{
	constructor(){
		super();

		this.state={
			info:[],
			values:{},
		}
	}
	componentDidMount(){
		axios.get('/api/tabs').then(res=>{
			this.setState({
				info:res.data.data.list
			})

		})
	}
	render(){
		if(this.props.mytitle=='aaa'){
			return <div>
				<nav>
					<NavLink to="/search" className={styles.sear}>搜索商品，发现更多优选</NavLink>
					<div className={styles.itemall}>
					<NavLink to="/tab1" className={styles.items1}>今日推荐</NavLink>
					<div className={styles.line}></div>
						<div className={styles.all}>	
							<div className={styles.secall}>
								{
									this.state.info.slice(1).map(item=>
										<NavLink key={item.id} className={styles.items} to={{pathname:`/tab/${item.id}`}} >{item.name}</NavLink>
									)
								}
							</div>
						</div>
					</div>
				</nav>
			</div>
		}else if(this.props.mytitle=='bbb'){
			return <div>
				<div className={styles.searin}>
					<NavLink className={styles.but1} to="/home">返回</NavLink>
					<input type='text' id='inp' placeholder='搜索商品，发现更多优选' className={styles.inp}/>
					<NavLink className={styles.but2} to="/searchd" onClick={this.handleclick.bind(this)}>搜索</NavLink>
				</div>
			</div>
		}else if(this.props.mytitle=='ccc'){
			return <div>
                <div className={styles.goback} onClick={this.handleclicks.bind(this)}>返回</div>
			</div>
		}else{
			return <div className={styles.sale9}>
				<div className={styles.con1}>
					<button className={styles.but3} >返回</button>
					{this.props.mytitle.name}
				</div>
				<ReactSwipe className="carousel" swipeOptions={{continuous:false}} key={this.props.mytitle.subColumns.length}>
				<div className={styles.div9}>
				<ul className={styles.ul1}>
					{
						this.props.mytitle.subColumns.map(item=>
						<li key={item.id} className={styles.li1}>{item.name}</li>)
					}
				</ul>
				</div>
				</ReactSwipe>
			</div>

		}
	}
	handleclick(){
		var inps=document.getElementById('inp').value;
		this.setState({
			values:inps
		})
		this.props.changevalue(inps);
	}
	handleclicks(){
		window.history.go(-1)
	}
}
export default connect((state)=>{
		return {
			mytitle:state.changetitleReducer
		}
	},

	{
			changevalue:(inps)=>{
				return {
					type:"CHANGE_VALUE",
					payload:inps

				}
			}
		}	
	)(Navber);