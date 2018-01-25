import React from 'react';
import styles from "./index.scss";
class BackTop extends React.Component {
    componentDidMount() {
        window.onscroll = function () {
            const t = document.documentElement.scrollTop || document.body.scrollTop;
            const top_view = document.getElementById('top_view');
            if (t>200) {
                top_view.style.display = 'block';
            }
        };
    }
    scrollToTop(){
        window.scrollTo(0, 0);
        top_view.style.display = 'none';
    };

    render() {
        return (
            <div
                id="top_view"
                onClick={this.scrollToTop}
                className={styles.backtop}
            >
                <span>顶部</span>
            </div>
        );
    }
}

export default BackTop;