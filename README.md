# Woa

## Technologies

### Frontend

* [TypeScript](https://github.com/Microsoft/TypeScript) - A superset of JavaScript that compiles to clean JavaScript
  output.
* [React](https://facebook.github.io/react) - A JavaScript library for building user interfaces. It introduces many
  great concepts, such as, Virtual DOM, Data flow, etc.
* [Create React App](https://github.com/facebookincubator/create-react-app) - is a new officially supported way to
  create single-page React applications. It offers a modern build setup with no configuration.
* [Bulma](https://bulma.io) - Bulma is a modern CSS framework based on Flexbox
* [Apollo 2](http://dev.apollodata.com/) - A flexible, fully-featured GraphQL client for every platform.
* [React Final Form](https://github.com/erikras/react-final-form) - High performance subscription-based form state
  management for React.

### Backend

* Ruby 2.4
* Rails 5.1
* [GraphQL-Ruby](https://github.com/rmosolgo/graphql-ruby) - GraphQL-Ruby is a Ruby implementation of
  [GraphQL](http://graphql.org).
* [GraphQL-batch](https://github.com/Shopify/graphql-batch) - GraphQL-batch is a query batching executor for the graphql
  gem.
* [Graphiql](https://github.com/graphql/graphiql) - Graphiql is an in-browser IDE for exploring GraphQL.
* [Rack CORS](https://github.com/cyu/rack-cors) - Rack Middleware for handling Cross-Origin Resource Sharing (CORS),
  which makes cross-origin AJAX possible.
* [Optics Agent](http://www.apollodata.com/optics) - Optics Agent for GraphQL Monitoring
* SQLite3 for development and PostgreSQL for production.

## Features

* Authentication with Devise and authorizations (visitors, users, admins)
* Creating user account
* Update user profile
* Setup dev tools
* Application ready for production

## GraphQL Using

* Queries et mutations
* Using `apollo-cache-inmemory`
* Apollo Link (dedup, onError, auth)
* [Managing local state](https://github.com/apollographql/apollo-link-state) with Apollo Link
* Optimistic UI
* [Static GraphQL queries](https://dev-blog.apollodata.com/5-benefits-of-static-graphql-queries-b7fa90b0b69a)
* Validation management and integration with Final Form
* Authentication and authorizations
* Protect queries and mutations on GraphQL API
* Batching of GraphQL queries into one HTTP request
* Batching of SQL queries backend side

## Prerequisites

* Ruby 2.4
* Node 9.2 ([Installing Node](https://nodejs.org/en/download/package-manager))
* SQLite3

## Getting Started

* Install Bundler

          $ gem install bundler

* Run Bundler to install/bundle gems needed by the project:

          woahstork$ bundle

* Create the database:

          woahstork$ rails db:migrate

* Run the Rails server in development mode

          woahstork$ rails server

* Run Yarn to install javascript package in other terminal:

          woahstork$ cd client
          woahstork/client$ yarn

* Start client in development mode. You should be able to go to `http://localhost:8080` :

           woahstork/client$ yarn start
