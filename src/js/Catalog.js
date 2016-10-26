import React, { Component } from 'react';
import ThreadPreview from './ThreadPreview';
//import Immutable from 'immutable';
import "../css/Catalog.css";

class Catalog extends Component {

	content() {
		if(this.props.loadState === 'empty') {
			return this.contentEmpty();
		} else if(this.props.loadState === 'loading') {
			return this.contentLoading();
		} else if(this.props.loadState === 'loaded') {
			return this.contentLoaded();
		} else if(this.props.loadState === 'error') {
			return this.contentError();
		} else {
			return <div>Unknown loadState {this.props.loadState}</div>
		}
	}

	contentEmpty() {
		return <div>Empty</div>;
	}

	contentLoading() {
		return <div>Loading</div>;
	}

	contentLoaded() {
		return [<div key="sorter">
				{this.props.sorters.map((sorter) => {
					return <a key={sorter.name} onClick={sorter.sorter}>{sorter.name}</a>	
				})}
			</div>
			,
			<div key="threads" className="Catalog-entries">
				{this.props.threads.map((thread) => {
					return <ThreadPreview
						key={thread.no + "x" + thread.tim}
						thread={thread}
						threadState={this.props.threadStates.get(thread.no.toString())}
						threadActions={this.props.threadActions} />
				})}
			</div>];
	}

	contentError() {
		return <div>Error</div>;
	}

	render() {
		return <div className="Catalog">
			{this.content()}
		</div>
	}
	
}

export default Catalog;
