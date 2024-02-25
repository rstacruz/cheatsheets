---
title: Relay
category: React
layout: 2017/sheet
updated: 2024-02-25
---

## Intro
Relay is a JavaScript framework for building data-driven React applications powered by GraphQL. It enables declarative data fetching and efficient data management.

## Queries
{: .-three-column}

### Basic Query
Relay uses GraphQL queries to fetch data. Components specify their data requirements using fragments.

### Fragments
```js
fragment UserProfile on User {
  name
  age
}
```
Fragments allow components to declare their data needs.

### Query Renderer
```js
<QueryRenderer
  environment={environment}
  query={graphql`
    query AppQuery {
      user(id: "4") {
        ...UserProfile
      }
    }
  `}
  render={({error, props}) => {
    if (props) {
      return <UserProfile user={props.user} />;
    } else {
      return <div>Loading</div>;
    }
  }}
/>
```
QueryRenderer fetches query data and renders the UI based on the data state.

## Mutations
{: .-three-column}

### Basic Mutation
```js
mutation CreateUserMutation($input: CreateUserInput!) {
  createUser(input: $input) {
    user {
      id
      name
    }
  }
}
```
Mutations modify data. Relay handles optimistic updates and error handling.

## Subscriptions
Subscriptions allow real-time updates to data.

## Advanced Topics
- **Pagination**: Relay handles list data and pagination efficiently.
- **Refetching**: Components can refetch their data in response to specific events.

## Best Practices
- **Data Masking**: Use fragments for component-specific data requirements.
- **Optimistic Updates**: Provide immediate feedback for user actions with optimistic updates.

## References
- Official Relay [Documentation](https://relay.dev/docs/)
