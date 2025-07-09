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

### Example
```js
// Subscription query
const CommentSubscription = graphql`
  subscription CommentSubscription($input: CommentSubscriptionInput!) {
    commentAdded(input: $input) {
      comment {
        id
        text
      }
    }
  }
`;

// Using the useSubscription hook
function CommentAddedSubscription({ postId }) {
  const [commit, isInFlight] = useSubscription(
    {
      subscription: CommentSubscription,
      variables: { input: { postId } },
      onNext: (data) => {
        console.log('Subscription data received: ', data);
      },
      onError: (error) => console.error(`An error occurred: ${error.message}`),
    }
  );

  return <div>Subscribing to new comments for post {postId}</div>;
}
```

## Relay Hooks
Relay provides a powerful set of React hooks that facilitate working with GraphQL data in a React application.

### useQuery
Fetches GraphQL queries with a hook.
```js
const data = useQuery(graphql`
  query UserQuery {
    user(id: "4") {
      name
      age
    }
  }
`);
```

### useMutation
Allows mutations to be executed from components.
```js
const [commit, isInFlight] = useMutation(graphql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
        name
      }
    }
  }
`);
```

### useSubscription
Subscribes to data changes.
```js
useSubscription(
  graphql`
    subscription UserSubscription {
      userUpdated(id: "4") {
        user {
          name
          age
        }
      }
    }
  `,
  {
    onNext: (data) => console.log(data),
  }
);
```

### useFragment
Allows components to specify their data requirements.
```js
const data = useFragment(fragmentNode, fragmentRef);
```

### useLazyLoadQuery
Fetches a query at component render.
```js
const data = useLazyLoadQuery(graphql`
  query UserQuery($id: ID!) {
    user(id: $id) {
      ...UserProfile
    }
  }
`, {id: '4'});
```

### usePaginationFragment
Handles data fetching for paginated data.
```js
const {data, loadNext, hasNext} = usePaginationFragment(fragmentNode, fragmentRef);
```

## Relay Entrypoint APIs
Entrypoint APIs provide a way to define entry points to Relay data for components.

### loadQuery
Used for loading a query outside of React components.
```js
const preloadedQuery = loadQuery(RelayEnvironment, query, variables);
```

## Relay Runtime API Reference
The Relay Runtime offers a set of APIs for low-level manipulation of the Relay store and environment.

### fetchQuery
Executes a query against the store.
```js
fetchQuery(RelayEnvironment, query, variables).then(data => {
  console.log(data);
});
```

### commitMutation
Commits a mutation.
```js
commitMutation(RelayEnvironment, {
  mutation,
  variables,
  onCompleted: (response, errors) => {
    console.log('Response received from server.');
  },
  onError: err => console.error(err),
});
```

## Advanced Topics
- **Pagination**: Relay handles list data and pagination efficiently.
- **Refetching**: Components can refetch their data in response to specific events.

## Best Practices
- **Data Masking**: Use fragments for component-specific data requirements.
- **Optimistic Updates**: Provide immediate feedback for user actions with optimistic updates.

## References
- Official Relay [Documentation](https://relay.dev/docs/)
