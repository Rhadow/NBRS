'use strict';

var React         = require('react'),
    Router        = require('react-router'),
    //Main Page
    Main          = require('../app/pages/main'),
    // Content Page
    MainContent   = require('../app/pages/main-content'),
    NotFound      = require('../app/pages/not-found'),
    // Router Methods
    Route         = Router.Route,
    RouteHandler  = Router.RouteHandler,
    DefaultRoute  = Router.DefaultRoute,
    NotFoundRoute = Router.NotFoundRoute,
    Routes;

/* jshint ignore:start */
Routes = (
    <Route path="/" handler={Main}>
        <Route name="project" handler={MainContent} />
        <DefaultRoute handler={MainContent} />
        <NotFoundRoute handler={NotFound} />
    </Route>
);

Router.run(Routes, function(Handler) {
    React.render(<Handler />, document.body);
});
/* jshint ignore:end */
