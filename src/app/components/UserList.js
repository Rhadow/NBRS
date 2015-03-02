'use strict';

var React        = require('react'),
    UserListItem = require('../../app/components/UserListItem.js'),
    UserList;

UserList = React.createClass({

	render: function() {
		var listItemNode = this.props.users.map(function(user, i){
			return (
				/* jshint ignore:start */
				<UserListItem user={user} key={i} id={i}/>
				/* jshint ignore:end */
			);
		}, this);
		return (
			/* jshint ignore:start */
			<table className="table">
			    <thead>
			        <th>Name</th>
			        <th>Age</th>
			        <th>Delete</th>
			    </thead>
			    <tbody>
			        {listItemNode}
			    </tbody>
			</table>
			/* jshint ignore:end */
		);
	}

});

module.exports = UserList;