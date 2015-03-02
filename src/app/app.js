'use strict';

var React         = require('react'),
    Router        = require('react-router'),
    //Main Page
    Main          = require('../app/pages/main'),
    // Content Page
    ProjectList   = require('../app/pages/project-list'),
    BugDetail     = require('../app/pages/bug-detail'),
    BugList       = require('../app/pages/bug-list'),
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
        <Route name="project" handler={ProjectList} >
            <Route name="name" path=":projectName" handler={BugList}/>
            <DefaultRoute handler={BugDetail}/>
        </Route>
        <Route name="test" handler={BugDetail} />
        <DefaultRoute handler={ProjectList} />
        <NotFoundRoute handler={NotFound} />
    </Route>
);

Router.run(Routes, function(Handler) {
    React.render(<Handler />, document.body);
});
/* jshint ignore:end */
