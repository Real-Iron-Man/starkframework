
<br/>
<br/>
<br/>

<img src='Stark Framework.png' style ="width : 25%">

<br/>
<br/>
<br/>

# Stark Framework

<br/>
<br/>
<br/>

# Current State : 
It's obvious frameworks are needlessly complex, difficult to update, debug, and add new features to.

<br/>
<br/>
<br/>

# Problems being solved : 
- Truely re-usable UI components with just HTML, CSS, JS + socketIO
- Efficient data loading via IO events : 
    Load only what is needed when it is needed
- A structure which effectively fights entropy and increases speed and developer happiness over time

<br/>
<br/>
<br/>

# Ultimate goal : 
    Create a shift in the way we think about how content is rendered

# Goals : 
- Reduce complexity of creating websites
- Increase feature releases, fixes and updates
- Provide an architectural structure which is obvious and easy for any level of developer

# Pillars : 
- Load only what is needed when needed
- Keep everything JS, HTML, CSS and socket IO events
- Do not mix HTML + JS directly together like all other frameworks do but allow HTML to be created dynamically to make development enjoyable and scalable
- Prioritize simple, event-driven dynamic rendering of needed UI components over other methods (example templating engine)
- if there is a strictly HTML , JS way to accomplish what .ejs is doing with conditional loading and other features (while still allowing for data to be sent via requests), then let's try pursuing that
- snake_case for reduced context-shifting and mental strain
Why? see <a href="https://stackoverflow.com/questions/21503430/snake-case-or-camelcase-in-node-js
        https://www.cs.kent.edu/~jmaletic/papers/ICPC2010-CamelCaseUnderScoreClouds.pdf">here</a>
and <a href="https://stackoverflow.com/questions/33094418/why-use-camel-case-for-js-and-snake-case-for-your-db">here</a>

This means everything is snake_case (yes even front-end)
The DB syntax matches the back end which matches the front-end which matches the API
But write however you want, my only goal is to help the current state of front-end and dev. because it is needed.

<br/>
<br/>
<br/>

# Getting Started  : 

# Approach # 1 - take and give :

Oo into express project and take what you need

Create standalone .ejs files, functions, components

The components are either : 

1) Rendered all at once (via ejs include) or 

2) Rendered conditionally :
    see home_logged_out.ejs

    Example using .ejs : 
        <% if ( render_component_2 == 1 ){ %>
            <%- include('./partials/component_2.ejs') %>
        <% } %>
3) Rendered efficiently and dynamically via socket IO events through JS functions or user events




# Approach # 2 - running the example project : 
open example express project and have at it , then : 

    npm install
    cd .\example_project_express\
    nodemon server.js
    


# Change VS Code settings to not show .ejs errors : 
    preferences --> settings --> uncheck "HTML › Validate: Scripts"


# Errors and Solutions : 
    Error       : ReferenceError : io is not defined
    Solution    : 
        Make sure io connection is AFTER server.listen

    Error : "js/stark_framework.js” was blocked due to MIME type (“text/html”)"
    Solution : 
        
