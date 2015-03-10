var React     = require('react'),
    // Constants
    constants = require('../constants/constants'),
    Help;

Help = React.createClass({
    render: function() {
        /* jshint ignore:start */
        return (
            <div>{constants.EN_LEXICON.NOT_FOUND_TITLE}</div>
        );
        /* jshint ignore:end */
    }

});

module.exports = Help;