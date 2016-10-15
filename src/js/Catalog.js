import React, { Component } from 'react';
import ThreadPreview from './ThreadPreview';
import "../css/Catalog.css";

class Catalog extends Component {

	render() {
		console.log(this.props.sorters)
		return <div className="Catalog">
			<div>
				{this.props.sorters.map((sorter) => {
					return <a onClick={sorter.sorter}>{sorter.name}</a>	
				})}
				{this.props.threads.length}
			</div>
			<div className="Catalog-entries">
				{this.props.threads.map((thread) => {
					return <ThreadPreview thread={thread} key={thread.no} />
				})}
			</div>
		</div>
	}
	
}

export default Catalog;
