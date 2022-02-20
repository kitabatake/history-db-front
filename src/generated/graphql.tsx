import * as Apollo from '@apollo/client';
import {gql} from '@apollo/client';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Activity = {
  __typename?: 'Activity';
  day?: Maybe<Scalars['Int']>;
  description: Scalars['String'];
  id: Scalars['Int'];
  month?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  source?: Maybe<Source>;
  year?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPersonAlias: Person;
  addRelatedPerson: Person;
  addRelationshipToActivity: Person;
  createActivity: Activity;
  createPerson: Person;
  createSource: Source;
  deleteActivity: Scalars['Int'];
  deletePerson: Person;
  deleteSource: Source;
  removePersonAlias: Person;
  removeRelatedPerson: Scalars['Int'];
  updateActivity: Activity;
  updatePerson: Person;
  updateSource: Source;
};


export type MutationAddPersonAliasArgs = {
  alias: Scalars['String'];
  personId: Scalars['Int'];
};


export type MutationAddRelatedPersonArgs = {
  fromId: Scalars['Int'];
  label: Scalars['String'];
  toId: Scalars['Int'];
};


export type MutationAddRelationshipToActivityArgs = {
  activityId: Scalars['Int'];
  label: Scalars['String'];
  personId: Scalars['Int'];
};


export type MutationCreateActivityArgs = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationCreatePersonArgs = {
  description: Scalars['String'];
  name: Scalars['String'];
};


export type MutationCreateSourceArgs = {
  name: Scalars['String'];
};


export type MutationDeleteActivityArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePersonArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteSourceArgs = {
  id: Scalars['Int'];
};


export type MutationRemovePersonAliasArgs = {
  alias: Scalars['String'];
  personId: Scalars['Int'];
};


export type MutationRemoveRelatedPersonArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateActivityArgs = {
  day?: InputMaybe<Scalars['Int']>;
  description: Scalars['String'];
  id: Scalars['Int'];
  month?: InputMaybe<Scalars['Int']>;
  personIds?: InputMaybe<Array<Scalars['Int']>>;
  sourceId?: InputMaybe<Scalars['Int']>;
  year?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdatePersonArgs = {
  description: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationUpdateSourceArgs = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Person = {
  __typename?: 'Person';
  activities: Array<Activity>;
  aliases: Array<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  relatedPersons: Array<RelatedPerson>;
};

export type Query = {
  __typename?: 'Query';
  activities: Array<Activity>;
  person: Person;
  persons: Array<Person>;
  source: Source;
  sources: Array<Source>;
};


export type QueryActivitiesArgs = {
  nameForSearch?: InputMaybe<Scalars['String']>;
};


export type QueryPersonArgs = {
  id: Scalars['Int'];
};


export type QueryPersonsArgs = {
  nameForSearch?: InputMaybe<Scalars['String']>;
};


export type QuerySourceArgs = {
  id: Scalars['Int'];
};


export type QuerySourcesArgs = {
  nameForSearch?: InputMaybe<Scalars['String']>;
};

export type RelatedPerson = {
  __typename?: 'RelatedPerson';
  direction: RelationshipDirection;
  id: Scalars['Int'];
  label: Scalars['String'];
  person: Person;
};

export enum RelationshipDirection {
  Inward = 'INWARD',
  Outward = 'OUTWARD'
}

export type Source = {
  __typename?: 'Source';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type GetActivitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActivitiesQuery = { __typename?: 'Query', activities: Array<{ __typename?: 'Activity', id: number, name: string, description: string }> };

export type SearchActivitiesQueryVariables = Exact<{
  nameForSearch: Scalars['String'];
}>;


export type SearchActivitiesQuery = { __typename?: 'Query', activities: Array<{ __typename?: 'Activity', id: number, name: string }> };

export type CreateActivityMutationVariables = Exact<{
  name: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
}>;


export type CreateActivityMutation = { __typename?: 'Mutation', createActivity: { __typename?: 'Activity', id: number } };

export type DeleteActivityMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteActivityMutation = { __typename?: 'Mutation', deleteActivity: number };

export type GetPersonQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetPersonQuery = { __typename?: 'Query', person: { __typename?: 'Person', id: number, name: string, description?: string | null | undefined } };

export type GetPersonWithDetailsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetPersonWithDetailsQuery = { __typename?: 'Query', person: { __typename?: 'Person', id: number, name: string, description?: string | null | undefined, aliases: Array<string>, relatedPersons: Array<{ __typename?: 'RelatedPerson', id: number, label: string, direction: RelationshipDirection, person: { __typename?: 'Person', id: number, name: string } }>, activities: Array<{ __typename?: 'Activity', id: number, description: string }> } };

export type GetPersonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPersonsQuery = { __typename?: 'Query', persons: Array<{ __typename?: 'Person', id: number, name: string, description?: string | null | undefined }> };

export type DeletePersonMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePersonMutation = { __typename?: 'Mutation', deletePerson: { __typename?: 'Person', id: number } };

export type CreatePersonMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreatePersonMutation = { __typename?: 'Mutation', createPerson: { __typename?: 'Person', id: number, name: string } };

export type RemoveRelatedPersonMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveRelatedPersonMutation = { __typename?: 'Mutation', removeRelatedPerson: number };

export type UpdatePersonMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
}>;


export type UpdatePersonMutation = { __typename?: 'Mutation', updatePerson: { __typename?: 'Person', id: number } };

export type AddPersonAliasMutationVariables = Exact<{
  personId: Scalars['Int'];
  alias: Scalars['String'];
}>;


export type AddPersonAliasMutation = { __typename?: 'Mutation', addPersonAlias: { __typename?: 'Person', id: number, name: string } };

export type RemovePersonAliasMutationVariables = Exact<{
  personId: Scalars['Int'];
  alias: Scalars['String'];
}>;


export type RemovePersonAliasMutation = { __typename?: 'Mutation', removePersonAlias: { __typename?: 'Person', id: number, name: string } };

export type AddRelatedPersonMutationVariables = Exact<{
  fromId: Scalars['Int'];
  toId: Scalars['Int'];
  label: Scalars['String'];
}>;


export type AddRelatedPersonMutation = { __typename?: 'Mutation', addRelatedPerson: { __typename?: 'Person', id: number } };

export type AddRelationshipToActivityMutationVariables = Exact<{
  personId: Scalars['Int'];
  activityId: Scalars['Int'];
  label: Scalars['String'];
}>;


export type AddRelationshipToActivityMutation = { __typename?: 'Mutation', addRelationshipToActivity: { __typename?: 'Person', id: number } };

export type SearchPersonsQueryVariables = Exact<{
  nameForSearch: Scalars['String'];
}>;


export type SearchPersonsQuery = { __typename?: 'Query', persons: Array<{ __typename?: 'Person', id: number, name: string }> };

export type GetSourceQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetSourceQuery = { __typename?: 'Query', source: { __typename?: 'Source', id: number, name: string } };

export type GetSourcesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSourcesQuery = { __typename?: 'Query', sources: Array<{ __typename?: 'Source', id: number, name: string }> };

export type SearchSourcesQueryVariables = Exact<{
  nameForSearch: Scalars['String'];
}>;


export type SearchSourcesQuery = { __typename?: 'Query', sources: Array<{ __typename?: 'Source', id: number, name: string }> };

export type CreateSourceMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateSourceMutation = { __typename?: 'Mutation', createSource: { __typename?: 'Source', id: number, name: string } };

export type UpdateSourceMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
}>;


export type UpdateSourceMutation = { __typename?: 'Mutation', updateSource: { __typename?: 'Source', id: number, name: string } };

export type DeleteSourceMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteSourceMutation = { __typename?: 'Mutation', deleteSource: { __typename?: 'Source', id: number } };


export const GetActivitiesDocument = gql`
    query GetActivities {
  activities {
    id
    name
    description
  }
}
    `;

/**
 * __useGetActivitiesQuery__
 *
 * To run a query within a React component, call `useGetActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActivitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetActivitiesQuery, GetActivitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActivitiesQuery, GetActivitiesQueryVariables>(GetActivitiesDocument, options);
      }
export function useGetActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActivitiesQuery, GetActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActivitiesQuery, GetActivitiesQueryVariables>(GetActivitiesDocument, options);
        }
export type GetActivitiesQueryHookResult = ReturnType<typeof useGetActivitiesQuery>;
export type GetActivitiesLazyQueryHookResult = ReturnType<typeof useGetActivitiesLazyQuery>;
export type GetActivitiesQueryResult = Apollo.QueryResult<GetActivitiesQuery, GetActivitiesQueryVariables>;
export const SearchActivitiesDocument = gql`
    query SearchActivities($nameForSearch: String!) {
  activities(nameForSearch: $nameForSearch) {
    id
    name
  }
}
    `;

/**
 * __useSearchActivitiesQuery__
 *
 * To run a query within a React component, call `useSearchActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchActivitiesQuery({
 *   variables: {
 *      nameForSearch: // value for 'nameForSearch'
 *   },
 * });
 */
export function useSearchActivitiesQuery(baseOptions: Apollo.QueryHookOptions<SearchActivitiesQuery, SearchActivitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchActivitiesQuery, SearchActivitiesQueryVariables>(SearchActivitiesDocument, options);
      }
export function useSearchActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchActivitiesQuery, SearchActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchActivitiesQuery, SearchActivitiesQueryVariables>(SearchActivitiesDocument, options);
        }
export type SearchActivitiesQueryHookResult = ReturnType<typeof useSearchActivitiesQuery>;
export type SearchActivitiesLazyQueryHookResult = ReturnType<typeof useSearchActivitiesLazyQuery>;
export type SearchActivitiesQueryResult = Apollo.QueryResult<SearchActivitiesQuery, SearchActivitiesQueryVariables>;
export const CreateActivityDocument = gql`
    mutation CreateActivity($name: String!, $description: String) {
  createActivity(name: $name, description: $description) {
    id
  }
}
    `;
export type CreateActivityMutationFn = Apollo.MutationFunction<CreateActivityMutation, CreateActivityMutationVariables>;

/**
 * __useCreateActivityMutation__
 *
 * To run a mutation, you first call `useCreateActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createActivityMutation, { data, loading, error }] = useCreateActivityMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateActivityMutation(baseOptions?: Apollo.MutationHookOptions<CreateActivityMutation, CreateActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateActivityMutation, CreateActivityMutationVariables>(CreateActivityDocument, options);
      }
export type CreateActivityMutationHookResult = ReturnType<typeof useCreateActivityMutation>;
export type CreateActivityMutationResult = Apollo.MutationResult<CreateActivityMutation>;
export type CreateActivityMutationOptions = Apollo.BaseMutationOptions<CreateActivityMutation, CreateActivityMutationVariables>;
export const DeleteActivityDocument = gql`
    mutation DeleteActivity($id: Int!) {
  deleteActivity(id: $id)
}
    `;
export type DeleteActivityMutationFn = Apollo.MutationFunction<DeleteActivityMutation, DeleteActivityMutationVariables>;

/**
 * __useDeleteActivityMutation__
 *
 * To run a mutation, you first call `useDeleteActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteActivityMutation, { data, loading, error }] = useDeleteActivityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteActivityMutation(baseOptions?: Apollo.MutationHookOptions<DeleteActivityMutation, DeleteActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteActivityMutation, DeleteActivityMutationVariables>(DeleteActivityDocument, options);
      }
export type DeleteActivityMutationHookResult = ReturnType<typeof useDeleteActivityMutation>;
export type DeleteActivityMutationResult = Apollo.MutationResult<DeleteActivityMutation>;
export type DeleteActivityMutationOptions = Apollo.BaseMutationOptions<DeleteActivityMutation, DeleteActivityMutationVariables>;
export const GetPersonDocument = gql`
    query getPerson($id: Int!) {
  person(id: $id) {
    id
    name
    description
  }
}
    `;

/**
 * __useGetPersonQuery__
 *
 * To run a query within a React component, call `useGetPersonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPersonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPersonQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPersonQuery(baseOptions: Apollo.QueryHookOptions<GetPersonQuery, GetPersonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPersonQuery, GetPersonQueryVariables>(GetPersonDocument, options);
      }
export function useGetPersonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPersonQuery, GetPersonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPersonQuery, GetPersonQueryVariables>(GetPersonDocument, options);
        }
export type GetPersonQueryHookResult = ReturnType<typeof useGetPersonQuery>;
export type GetPersonLazyQueryHookResult = ReturnType<typeof useGetPersonLazyQuery>;
export type GetPersonQueryResult = Apollo.QueryResult<GetPersonQuery, GetPersonQueryVariables>;
export const GetPersonWithDetailsDocument = gql`
    query getPersonWithDetails($id: Int!) {
  person(id: $id) {
    id
    name
    description
    aliases
    relatedPersons {
      id
      label
      direction
      person {
        id
        name
      }
    }
    activities {
      id
      description
    }
  }
}
    `;

/**
 * __useGetPersonWithDetailsQuery__
 *
 * To run a query within a React component, call `useGetPersonWithDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPersonWithDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPersonWithDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPersonWithDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetPersonWithDetailsQuery, GetPersonWithDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPersonWithDetailsQuery, GetPersonWithDetailsQueryVariables>(GetPersonWithDetailsDocument, options);
      }
export function useGetPersonWithDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPersonWithDetailsQuery, GetPersonWithDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPersonWithDetailsQuery, GetPersonWithDetailsQueryVariables>(GetPersonWithDetailsDocument, options);
        }
export type GetPersonWithDetailsQueryHookResult = ReturnType<typeof useGetPersonWithDetailsQuery>;
export type GetPersonWithDetailsLazyQueryHookResult = ReturnType<typeof useGetPersonWithDetailsLazyQuery>;
export type GetPersonWithDetailsQueryResult = Apollo.QueryResult<GetPersonWithDetailsQuery, GetPersonWithDetailsQueryVariables>;
export const GetPersonsDocument = gql`
    query GetPersons {
  persons {
    id
    name
    description
  }
}
    `;

/**
 * __useGetPersonsQuery__
 *
 * To run a query within a React component, call `useGetPersonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPersonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPersonsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPersonsQuery(baseOptions?: Apollo.QueryHookOptions<GetPersonsQuery, GetPersonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPersonsQuery, GetPersonsQueryVariables>(GetPersonsDocument, options);
      }
export function useGetPersonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPersonsQuery, GetPersonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPersonsQuery, GetPersonsQueryVariables>(GetPersonsDocument, options);
        }
export type GetPersonsQueryHookResult = ReturnType<typeof useGetPersonsQuery>;
export type GetPersonsLazyQueryHookResult = ReturnType<typeof useGetPersonsLazyQuery>;
export type GetPersonsQueryResult = Apollo.QueryResult<GetPersonsQuery, GetPersonsQueryVariables>;
export const DeletePersonDocument = gql`
    mutation DeletePerson($id: Int!) {
  deletePerson(id: $id) {
    id
  }
}
    `;
export type DeletePersonMutationFn = Apollo.MutationFunction<DeletePersonMutation, DeletePersonMutationVariables>;

/**
 * __useDeletePersonMutation__
 *
 * To run a mutation, you first call `useDeletePersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePersonMutation, { data, loading, error }] = useDeletePersonMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePersonMutation(baseOptions?: Apollo.MutationHookOptions<DeletePersonMutation, DeletePersonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePersonMutation, DeletePersonMutationVariables>(DeletePersonDocument, options);
      }
export type DeletePersonMutationHookResult = ReturnType<typeof useDeletePersonMutation>;
export type DeletePersonMutationResult = Apollo.MutationResult<DeletePersonMutation>;
export type DeletePersonMutationOptions = Apollo.BaseMutationOptions<DeletePersonMutation, DeletePersonMutationVariables>;
export const CreatePersonDocument = gql`
    mutation CreatePerson($name: String!, $description: String!) {
  createPerson(name: $name, description: $description) {
    id
    name
  }
}
    `;
export type CreatePersonMutationFn = Apollo.MutationFunction<CreatePersonMutation, CreatePersonMutationVariables>;

/**
 * __useCreatePersonMutation__
 *
 * To run a mutation, you first call `useCreatePersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPersonMutation, { data, loading, error }] = useCreatePersonMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreatePersonMutation(baseOptions?: Apollo.MutationHookOptions<CreatePersonMutation, CreatePersonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePersonMutation, CreatePersonMutationVariables>(CreatePersonDocument, options);
      }
export type CreatePersonMutationHookResult = ReturnType<typeof useCreatePersonMutation>;
export type CreatePersonMutationResult = Apollo.MutationResult<CreatePersonMutation>;
export type CreatePersonMutationOptions = Apollo.BaseMutationOptions<CreatePersonMutation, CreatePersonMutationVariables>;
export const RemoveRelatedPersonDocument = gql`
    mutation RemoveRelatedPerson($id: Int!) {
  removeRelatedPerson(id: $id)
}
    `;
export type RemoveRelatedPersonMutationFn = Apollo.MutationFunction<RemoveRelatedPersonMutation, RemoveRelatedPersonMutationVariables>;

/**
 * __useRemoveRelatedPersonMutation__
 *
 * To run a mutation, you first call `useRemoveRelatedPersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveRelatedPersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeRelatedPersonMutation, { data, loading, error }] = useRemoveRelatedPersonMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveRelatedPersonMutation(baseOptions?: Apollo.MutationHookOptions<RemoveRelatedPersonMutation, RemoveRelatedPersonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveRelatedPersonMutation, RemoveRelatedPersonMutationVariables>(RemoveRelatedPersonDocument, options);
      }
export type RemoveRelatedPersonMutationHookResult = ReturnType<typeof useRemoveRelatedPersonMutation>;
export type RemoveRelatedPersonMutationResult = Apollo.MutationResult<RemoveRelatedPersonMutation>;
export type RemoveRelatedPersonMutationOptions = Apollo.BaseMutationOptions<RemoveRelatedPersonMutation, RemoveRelatedPersonMutationVariables>;
export const UpdatePersonDocument = gql`
    mutation UpdatePerson($id: Int!, $name: String!, $description: String!) {
  updatePerson(id: $id, name: $name, description: $description) {
    id
  }
}
    `;
export type UpdatePersonMutationFn = Apollo.MutationFunction<UpdatePersonMutation, UpdatePersonMutationVariables>;

/**
 * __useUpdatePersonMutation__
 *
 * To run a mutation, you first call `useUpdatePersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePersonMutation, { data, loading, error }] = useUpdatePersonMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdatePersonMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePersonMutation, UpdatePersonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePersonMutation, UpdatePersonMutationVariables>(UpdatePersonDocument, options);
      }
export type UpdatePersonMutationHookResult = ReturnType<typeof useUpdatePersonMutation>;
export type UpdatePersonMutationResult = Apollo.MutationResult<UpdatePersonMutation>;
export type UpdatePersonMutationOptions = Apollo.BaseMutationOptions<UpdatePersonMutation, UpdatePersonMutationVariables>;
export const AddPersonAliasDocument = gql`
    mutation AddPersonAlias($personId: Int!, $alias: String!) {
  addPersonAlias(personId: $personId, alias: $alias) {
    id
    name
  }
}
    `;
export type AddPersonAliasMutationFn = Apollo.MutationFunction<AddPersonAliasMutation, AddPersonAliasMutationVariables>;

/**
 * __useAddPersonAliasMutation__
 *
 * To run a mutation, you first call `useAddPersonAliasMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPersonAliasMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPersonAliasMutation, { data, loading, error }] = useAddPersonAliasMutation({
 *   variables: {
 *      personId: // value for 'personId'
 *      alias: // value for 'alias'
 *   },
 * });
 */
export function useAddPersonAliasMutation(baseOptions?: Apollo.MutationHookOptions<AddPersonAliasMutation, AddPersonAliasMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPersonAliasMutation, AddPersonAliasMutationVariables>(AddPersonAliasDocument, options);
      }
export type AddPersonAliasMutationHookResult = ReturnType<typeof useAddPersonAliasMutation>;
export type AddPersonAliasMutationResult = Apollo.MutationResult<AddPersonAliasMutation>;
export type AddPersonAliasMutationOptions = Apollo.BaseMutationOptions<AddPersonAliasMutation, AddPersonAliasMutationVariables>;
export const RemovePersonAliasDocument = gql`
    mutation RemovePersonAlias($personId: Int!, $alias: String!) {
  removePersonAlias(personId: $personId, alias: $alias) {
    id
    name
  }
}
    `;
export type RemovePersonAliasMutationFn = Apollo.MutationFunction<RemovePersonAliasMutation, RemovePersonAliasMutationVariables>;

/**
 * __useRemovePersonAliasMutation__
 *
 * To run a mutation, you first call `useRemovePersonAliasMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePersonAliasMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePersonAliasMutation, { data, loading, error }] = useRemovePersonAliasMutation({
 *   variables: {
 *      personId: // value for 'personId'
 *      alias: // value for 'alias'
 *   },
 * });
 */
export function useRemovePersonAliasMutation(baseOptions?: Apollo.MutationHookOptions<RemovePersonAliasMutation, RemovePersonAliasMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePersonAliasMutation, RemovePersonAliasMutationVariables>(RemovePersonAliasDocument, options);
      }
export type RemovePersonAliasMutationHookResult = ReturnType<typeof useRemovePersonAliasMutation>;
export type RemovePersonAliasMutationResult = Apollo.MutationResult<RemovePersonAliasMutation>;
export type RemovePersonAliasMutationOptions = Apollo.BaseMutationOptions<RemovePersonAliasMutation, RemovePersonAliasMutationVariables>;
export const AddRelatedPersonDocument = gql`
    mutation AddRelatedPerson($fromId: Int!, $toId: Int!, $label: String!) {
  addRelatedPerson(fromId: $fromId, toId: $toId, label: $label) {
    id
  }
}
    `;
export type AddRelatedPersonMutationFn = Apollo.MutationFunction<AddRelatedPersonMutation, AddRelatedPersonMutationVariables>;

/**
 * __useAddRelatedPersonMutation__
 *
 * To run a mutation, you first call `useAddRelatedPersonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRelatedPersonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRelatedPersonMutation, { data, loading, error }] = useAddRelatedPersonMutation({
 *   variables: {
 *      fromId: // value for 'fromId'
 *      toId: // value for 'toId'
 *      label: // value for 'label'
 *   },
 * });
 */
export function useAddRelatedPersonMutation(baseOptions?: Apollo.MutationHookOptions<AddRelatedPersonMutation, AddRelatedPersonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddRelatedPersonMutation, AddRelatedPersonMutationVariables>(AddRelatedPersonDocument, options);
      }
export type AddRelatedPersonMutationHookResult = ReturnType<typeof useAddRelatedPersonMutation>;
export type AddRelatedPersonMutationResult = Apollo.MutationResult<AddRelatedPersonMutation>;
export type AddRelatedPersonMutationOptions = Apollo.BaseMutationOptions<AddRelatedPersonMutation, AddRelatedPersonMutationVariables>;
export const AddRelationshipToActivityDocument = gql`
    mutation AddRelationshipToActivity($personId: Int!, $activityId: Int!, $label: String!) {
  addRelationshipToActivity(
    personId: $personId
    activityId: $activityId
    label: $label
  ) {
    id
  }
}
    `;
export type AddRelationshipToActivityMutationFn = Apollo.MutationFunction<AddRelationshipToActivityMutation, AddRelationshipToActivityMutationVariables>;

/**
 * __useAddRelationshipToActivityMutation__
 *
 * To run a mutation, you first call `useAddRelationshipToActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddRelationshipToActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addRelationshipToActivityMutation, { data, loading, error }] = useAddRelationshipToActivityMutation({
 *   variables: {
 *      personId: // value for 'personId'
 *      activityId: // value for 'activityId'
 *      label: // value for 'label'
 *   },
 * });
 */
export function useAddRelationshipToActivityMutation(baseOptions?: Apollo.MutationHookOptions<AddRelationshipToActivityMutation, AddRelationshipToActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddRelationshipToActivityMutation, AddRelationshipToActivityMutationVariables>(AddRelationshipToActivityDocument, options);
      }
export type AddRelationshipToActivityMutationHookResult = ReturnType<typeof useAddRelationshipToActivityMutation>;
export type AddRelationshipToActivityMutationResult = Apollo.MutationResult<AddRelationshipToActivityMutation>;
export type AddRelationshipToActivityMutationOptions = Apollo.BaseMutationOptions<AddRelationshipToActivityMutation, AddRelationshipToActivityMutationVariables>;
export const SearchPersonsDocument = gql`
    query SearchPersons($nameForSearch: String!) {
  persons(nameForSearch: $nameForSearch) {
    id
    name
  }
}
    `;

/**
 * __useSearchPersonsQuery__
 *
 * To run a query within a React component, call `useSearchPersonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPersonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPersonsQuery({
 *   variables: {
 *      nameForSearch: // value for 'nameForSearch'
 *   },
 * });
 */
export function useSearchPersonsQuery(baseOptions: Apollo.QueryHookOptions<SearchPersonsQuery, SearchPersonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchPersonsQuery, SearchPersonsQueryVariables>(SearchPersonsDocument, options);
      }
export function useSearchPersonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchPersonsQuery, SearchPersonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchPersonsQuery, SearchPersonsQueryVariables>(SearchPersonsDocument, options);
        }
export type SearchPersonsQueryHookResult = ReturnType<typeof useSearchPersonsQuery>;
export type SearchPersonsLazyQueryHookResult = ReturnType<typeof useSearchPersonsLazyQuery>;
export type SearchPersonsQueryResult = Apollo.QueryResult<SearchPersonsQuery, SearchPersonsQueryVariables>;
export const GetSourceDocument = gql`
    query getSource($id: Int!) {
  source(id: $id) {
    id
    name
  }
}
    `;

/**
 * __useGetSourceQuery__
 *
 * To run a query within a React component, call `useGetSourceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSourceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSourceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSourceQuery(baseOptions: Apollo.QueryHookOptions<GetSourceQuery, GetSourceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSourceQuery, GetSourceQueryVariables>(GetSourceDocument, options);
      }
export function useGetSourceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSourceQuery, GetSourceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSourceQuery, GetSourceQueryVariables>(GetSourceDocument, options);
        }
export type GetSourceQueryHookResult = ReturnType<typeof useGetSourceQuery>;
export type GetSourceLazyQueryHookResult = ReturnType<typeof useGetSourceLazyQuery>;
export type GetSourceQueryResult = Apollo.QueryResult<GetSourceQuery, GetSourceQueryVariables>;
export const GetSourcesDocument = gql`
    query getSources {
  sources {
    id
    name
  }
}
    `;

/**
 * __useGetSourcesQuery__
 *
 * To run a query within a React component, call `useGetSourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSourcesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSourcesQuery(baseOptions?: Apollo.QueryHookOptions<GetSourcesQuery, GetSourcesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSourcesQuery, GetSourcesQueryVariables>(GetSourcesDocument, options);
      }
export function useGetSourcesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSourcesQuery, GetSourcesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSourcesQuery, GetSourcesQueryVariables>(GetSourcesDocument, options);
        }
export type GetSourcesQueryHookResult = ReturnType<typeof useGetSourcesQuery>;
export type GetSourcesLazyQueryHookResult = ReturnType<typeof useGetSourcesLazyQuery>;
export type GetSourcesQueryResult = Apollo.QueryResult<GetSourcesQuery, GetSourcesQueryVariables>;
export const SearchSourcesDocument = gql`
    query SearchSources($nameForSearch: String!) {
  sources(nameForSearch: $nameForSearch) {
    id
    name
  }
}
    `;

/**
 * __useSearchSourcesQuery__
 *
 * To run a query within a React component, call `useSearchSourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchSourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchSourcesQuery({
 *   variables: {
 *      nameForSearch: // value for 'nameForSearch'
 *   },
 * });
 */
export function useSearchSourcesQuery(baseOptions: Apollo.QueryHookOptions<SearchSourcesQuery, SearchSourcesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchSourcesQuery, SearchSourcesQueryVariables>(SearchSourcesDocument, options);
      }
export function useSearchSourcesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchSourcesQuery, SearchSourcesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchSourcesQuery, SearchSourcesQueryVariables>(SearchSourcesDocument, options);
        }
export type SearchSourcesQueryHookResult = ReturnType<typeof useSearchSourcesQuery>;
export type SearchSourcesLazyQueryHookResult = ReturnType<typeof useSearchSourcesLazyQuery>;
export type SearchSourcesQueryResult = Apollo.QueryResult<SearchSourcesQuery, SearchSourcesQueryVariables>;
export const CreateSourceDocument = gql`
    mutation CreateSource($name: String!) {
  createSource(name: $name) {
    id
    name
  }
}
    `;
export type CreateSourceMutationFn = Apollo.MutationFunction<CreateSourceMutation, CreateSourceMutationVariables>;

/**
 * __useCreateSourceMutation__
 *
 * To run a mutation, you first call `useCreateSourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSourceMutation, { data, loading, error }] = useCreateSourceMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateSourceMutation(baseOptions?: Apollo.MutationHookOptions<CreateSourceMutation, CreateSourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSourceMutation, CreateSourceMutationVariables>(CreateSourceDocument, options);
      }
export type CreateSourceMutationHookResult = ReturnType<typeof useCreateSourceMutation>;
export type CreateSourceMutationResult = Apollo.MutationResult<CreateSourceMutation>;
export type CreateSourceMutationOptions = Apollo.BaseMutationOptions<CreateSourceMutation, CreateSourceMutationVariables>;
export const UpdateSourceDocument = gql`
    mutation UpdateSource($id: Int!, $name: String!) {
  updateSource(id: $id, name: $name) {
    id
    name
  }
}
    `;
export type UpdateSourceMutationFn = Apollo.MutationFunction<UpdateSourceMutation, UpdateSourceMutationVariables>;

/**
 * __useUpdateSourceMutation__
 *
 * To run a mutation, you first call `useUpdateSourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSourceMutation, { data, loading, error }] = useUpdateSourceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateSourceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSourceMutation, UpdateSourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSourceMutation, UpdateSourceMutationVariables>(UpdateSourceDocument, options);
      }
export type UpdateSourceMutationHookResult = ReturnType<typeof useUpdateSourceMutation>;
export type UpdateSourceMutationResult = Apollo.MutationResult<UpdateSourceMutation>;
export type UpdateSourceMutationOptions = Apollo.BaseMutationOptions<UpdateSourceMutation, UpdateSourceMutationVariables>;
export const DeleteSourceDocument = gql`
    mutation DeleteSource($id: Int!) {
  deleteSource(id: $id) {
    id
  }
}
    `;
export type DeleteSourceMutationFn = Apollo.MutationFunction<DeleteSourceMutation, DeleteSourceMutationVariables>;

/**
 * __useDeleteSourceMutation__
 *
 * To run a mutation, you first call `useDeleteSourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSourceMutation, { data, loading, error }] = useDeleteSourceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSourceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSourceMutation, DeleteSourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSourceMutation, DeleteSourceMutationVariables>(DeleteSourceDocument, options);
      }
export type DeleteSourceMutationHookResult = ReturnType<typeof useDeleteSourceMutation>;
export type DeleteSourceMutationResult = Apollo.MutationResult<DeleteSourceMutation>;
export type DeleteSourceMutationOptions = Apollo.BaseMutationOptions<DeleteSourceMutation, DeleteSourceMutationVariables>;