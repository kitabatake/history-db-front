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
  persons: Array<Person>;
  source?: Maybe<Source>;
  year?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createActivity: Activity;
  createPerson: Person;
  createPersonAlias: PersonAlias;
  createPersonRelation: PersonRelation;
  createSource: Source;
  deleteActivity: Activity;
  deletePerson: Person;
  deletePersonAlias: PersonAlias;
  deletePersonRelation: PersonRelation;
  deleteSource: Source;
  updateActivity: Activity;
  updatePerson: Person;
  updatePersonRelation: PersonRelation;
  updateSource: Source;
};


export type MutationCreateActivityArgs = {
  day?: InputMaybe<Scalars['Int']>;
  description: Scalars['String'];
  month?: InputMaybe<Scalars['Int']>;
  personIds?: InputMaybe<Array<Scalars['Int']>>;
  sourceId?: InputMaybe<Scalars['Int']>;
  year?: InputMaybe<Scalars['Int']>;
};


export type MutationCreatePersonArgs = {
  description: Scalars['String'];
  name: Scalars['String'];
};


export type MutationCreatePersonAliasArgs = {
  alias: Scalars['String'];
  personId: Scalars['Int'];
};


export type MutationCreatePersonRelationArgs = {
  description: Scalars['String'];
  personIds?: InputMaybe<Array<Scalars['Int']>>;
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


export type MutationDeletePersonAliasArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePersonRelationArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteSourceArgs = {
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


export type MutationUpdatePersonRelationArgs = {
  description: Scalars['String'];
  id: Scalars['Int'];
  personIds?: InputMaybe<Array<Scalars['Int']>>;
};


export type MutationUpdateSourceArgs = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Person = {
  __typename?: 'Person';
  activities: Array<Activity>;
  aliases: Array<PersonAlias>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  relations: Array<PersonRelation>;
};

export type PersonAlias = {
  __typename?: 'PersonAlias';
  alias: Scalars['String'];
  id: Scalars['Int'];
  person: Person;
};

export type PersonRelation = {
  __typename?: 'PersonRelation';
  description: Scalars['String'];
  id: Scalars['Int'];
  persons: Array<Person>;
};

export type Query = {
  __typename?: 'Query';
  activities: Array<Activity>;
  activity: Activity;
  person: Person;
  personAliases: Array<PersonAlias>;
  personRelation: PersonRelation;
  personRelations: Array<PersonRelation>;
  persons: Array<Person>;
  source: Source;
  sources: Array<Source>;
};


export type QueryActivityArgs = {
  id: Scalars['Int'];
};


export type QueryPersonArgs = {
  id: Scalars['Int'];
};


export type QueryPersonAliasesArgs = {
  personId: Scalars['Int'];
};


export type QueryPersonRelationArgs = {
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

export type Source = {
  __typename?: 'Source';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type GetActivitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActivitiesQuery = { __typename?: 'Query', activities: Array<{ __typename?: 'Activity', id: number, description: string, year?: number | null | undefined, month?: number | null | undefined, day?: number | null | undefined, persons: Array<{ __typename?: 'Person', id: number, name: string }> }> };

export type GetActivityQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetActivityQuery = { __typename?: 'Query', activity: { __typename?: 'Activity', id: number, description: string, year?: number | null | undefined, month?: number | null | undefined, day?: number | null | undefined, persons: Array<{ __typename?: 'Person', id: number, name: string }>, source?: { __typename?: 'Source', id: number, name: string } | null | undefined } };

export type CreateActivityMutationVariables = Exact<{
  description: Scalars['String'];
  sourceId?: InputMaybe<Scalars['Int']>;
  personIds?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
  year?: InputMaybe<Scalars['Int']>;
  month?: InputMaybe<Scalars['Int']>;
  day?: InputMaybe<Scalars['Int']>;
}>;


export type CreateActivityMutation = { __typename?: 'Mutation', createActivity: { __typename?: 'Activity', id: number } };

export type UpdateActivityMutationVariables = Exact<{
  id: Scalars['Int'];
  description: Scalars['String'];
  sourceId?: InputMaybe<Scalars['Int']>;
  personIds?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
  year?: InputMaybe<Scalars['Int']>;
  month?: InputMaybe<Scalars['Int']>;
  day?: InputMaybe<Scalars['Int']>;
}>;


export type UpdateActivityMutation = { __typename?: 'Mutation', updateActivity: { __typename?: 'Activity', id: number } };

export type DeleteActivityMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteActivityMutation = { __typename?: 'Mutation', deleteActivity: { __typename?: 'Activity', id: number } };

export type GetPersonAliasesQueryVariables = Exact<{
  personId: Scalars['Int'];
}>;


export type GetPersonAliasesQuery = { __typename?: 'Query', personAliases: Array<{ __typename?: 'PersonAlias', id: number, alias: string }> };

export type CreatePersonAliasMutationVariables = Exact<{
  personId: Scalars['Int'];
  alias: Scalars['String'];
}>;


export type CreatePersonAliasMutation = { __typename?: 'Mutation', createPersonAlias: { __typename?: 'PersonAlias', id: number } };

export type DeletePersonAliasMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePersonAliasMutation = { __typename?: 'Mutation', deletePersonAlias: { __typename?: 'PersonAlias', id: number } };

export type GetPersonRelationQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetPersonRelationQuery = { __typename?: 'Query', personRelation: { __typename?: 'PersonRelation', id: number, description: string, persons: Array<{ __typename?: 'Person', id: number, name: string }> } };

export type GetPersonRelationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPersonRelationsQuery = { __typename?: 'Query', personRelations: Array<{ __typename?: 'PersonRelation', id: number, description: string, persons: Array<{ __typename?: 'Person', id: number, name: string }> }> };

export type CreatePersonRelationMutationVariables = Exact<{
  description: Scalars['String'];
  personIds?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type CreatePersonRelationMutation = { __typename?: 'Mutation', createPersonRelation: { __typename?: 'PersonRelation', id: number, description: string } };

export type UpdatePersonRelationMutationVariables = Exact<{
  id: Scalars['Int'];
  description: Scalars['String'];
  personIds?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type UpdatePersonRelationMutation = { __typename?: 'Mutation', updatePersonRelation: { __typename?: 'PersonRelation', id: number } };

export type DeletePersonRelationMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePersonRelationMutation = { __typename?: 'Mutation', deletePersonRelation: { __typename?: 'PersonRelation', id: number } };

export type GetPersonQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetPersonQuery = { __typename?: 'Query', person: { __typename?: 'Person', id: number, name: string, description?: string | null | undefined } };

export type GetPersonWithDetailsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetPersonWithDetailsQuery = { __typename?: 'Query', person: { __typename?: 'Person', id: number, name: string, description?: string | null | undefined, relations: Array<{ __typename?: 'PersonRelation', id: number, description: string, persons: Array<{ __typename?: 'Person', id: number, name: string }> }>, activities: Array<{ __typename?: 'Activity', id: number, description: string, persons: Array<{ __typename?: 'Person', id: number, name: string }> }>, aliases: Array<{ __typename?: 'PersonAlias', id: number, alias: string }> } };

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

export type UpdatePersonMutationVariables = Exact<{
  id: Scalars['Int'];
  name: Scalars['String'];
  description: Scalars['String'];
}>;


export type UpdatePersonMutation = { __typename?: 'Mutation', updatePerson: { __typename?: 'Person', id: number } };

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
    description
    year
    month
    day
    persons {
      id
      name
    }
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
export const GetActivityDocument = gql`
    query getActivity($id: Int!) {
  activity(id: $id) {
    id
    description
    year
    month
    day
    persons {
      id
      name
    }
    source {
      id
      name
    }
  }
}
    `;

/**
 * __useGetActivityQuery__
 *
 * To run a query within a React component, call `useGetActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActivityQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetActivityQuery(baseOptions: Apollo.QueryHookOptions<GetActivityQuery, GetActivityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetActivityQuery, GetActivityQueryVariables>(GetActivityDocument, options);
      }
export function useGetActivityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActivityQuery, GetActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetActivityQuery, GetActivityQueryVariables>(GetActivityDocument, options);
        }
export type GetActivityQueryHookResult = ReturnType<typeof useGetActivityQuery>;
export type GetActivityLazyQueryHookResult = ReturnType<typeof useGetActivityLazyQuery>;
export type GetActivityQueryResult = Apollo.QueryResult<GetActivityQuery, GetActivityQueryVariables>;
export const CreateActivityDocument = gql`
    mutation CreateActivity($description: String!, $sourceId: Int, $personIds: [Int!], $year: Int, $month: Int, $day: Int) {
  createActivity(
    description: $description
    sourceId: $sourceId
    personIds: $personIds
    year: $year
    month: $month
    day: $day
  ) {
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
 *      description: // value for 'description'
 *      sourceId: // value for 'sourceId'
 *      personIds: // value for 'personIds'
 *      year: // value for 'year'
 *      month: // value for 'month'
 *      day: // value for 'day'
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
export const UpdateActivityDocument = gql`
    mutation UpdateActivity($id: Int!, $description: String!, $sourceId: Int, $personIds: [Int!], $year: Int, $month: Int, $day: Int) {
  updateActivity(
    id: $id
    description: $description
    sourceId: $sourceId
    personIds: $personIds
    year: $year
    month: $month
    day: $day
  ) {
    id
  }
}
    `;
export type UpdateActivityMutationFn = Apollo.MutationFunction<UpdateActivityMutation, UpdateActivityMutationVariables>;

/**
 * __useUpdateActivityMutation__
 *
 * To run a mutation, you first call `useUpdateActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateActivityMutation, { data, loading, error }] = useUpdateActivityMutation({
 *   variables: {
 *      id: // value for 'id'
 *      description: // value for 'description'
 *      sourceId: // value for 'sourceId'
 *      personIds: // value for 'personIds'
 *      year: // value for 'year'
 *      month: // value for 'month'
 *      day: // value for 'day'
 *   },
 * });
 */
export function useUpdateActivityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateActivityMutation, UpdateActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateActivityMutation, UpdateActivityMutationVariables>(UpdateActivityDocument, options);
      }
export type UpdateActivityMutationHookResult = ReturnType<typeof useUpdateActivityMutation>;
export type UpdateActivityMutationResult = Apollo.MutationResult<UpdateActivityMutation>;
export type UpdateActivityMutationOptions = Apollo.BaseMutationOptions<UpdateActivityMutation, UpdateActivityMutationVariables>;
export const DeleteActivityDocument = gql`
    mutation DeleteActivity($id: Int!) {
  deleteActivity(id: $id) {
    id
  }
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
export const GetPersonAliasesDocument = gql`
    query getPersonAliases($personId: Int!) {
  personAliases(personId: $personId) {
    id
    alias
  }
}
    `;

/**
 * __useGetPersonAliasesQuery__
 *
 * To run a query within a React component, call `useGetPersonAliasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPersonAliasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPersonAliasesQuery({
 *   variables: {
 *      personId: // value for 'personId'
 *   },
 * });
 */
export function useGetPersonAliasesQuery(baseOptions: Apollo.QueryHookOptions<GetPersonAliasesQuery, GetPersonAliasesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPersonAliasesQuery, GetPersonAliasesQueryVariables>(GetPersonAliasesDocument, options);
      }
export function useGetPersonAliasesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPersonAliasesQuery, GetPersonAliasesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPersonAliasesQuery, GetPersonAliasesQueryVariables>(GetPersonAliasesDocument, options);
        }
export type GetPersonAliasesQueryHookResult = ReturnType<typeof useGetPersonAliasesQuery>;
export type GetPersonAliasesLazyQueryHookResult = ReturnType<typeof useGetPersonAliasesLazyQuery>;
export type GetPersonAliasesQueryResult = Apollo.QueryResult<GetPersonAliasesQuery, GetPersonAliasesQueryVariables>;
export const CreatePersonAliasDocument = gql`
    mutation CreatePersonAlias($personId: Int!, $alias: String!) {
  createPersonAlias(personId: $personId, alias: $alias) {
    id
  }
}
    `;
export type CreatePersonAliasMutationFn = Apollo.MutationFunction<CreatePersonAliasMutation, CreatePersonAliasMutationVariables>;

/**
 * __useCreatePersonAliasMutation__
 *
 * To run a mutation, you first call `useCreatePersonAliasMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePersonAliasMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPersonAliasMutation, { data, loading, error }] = useCreatePersonAliasMutation({
 *   variables: {
 *      personId: // value for 'personId'
 *      alias: // value for 'alias'
 *   },
 * });
 */
export function useCreatePersonAliasMutation(baseOptions?: Apollo.MutationHookOptions<CreatePersonAliasMutation, CreatePersonAliasMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePersonAliasMutation, CreatePersonAliasMutationVariables>(CreatePersonAliasDocument, options);
      }
export type CreatePersonAliasMutationHookResult = ReturnType<typeof useCreatePersonAliasMutation>;
export type CreatePersonAliasMutationResult = Apollo.MutationResult<CreatePersonAliasMutation>;
export type CreatePersonAliasMutationOptions = Apollo.BaseMutationOptions<CreatePersonAliasMutation, CreatePersonAliasMutationVariables>;
export const DeletePersonAliasDocument = gql`
    mutation DeletePersonAlias($id: Int!) {
  deletePersonAlias(id: $id) {
    id
  }
}
    `;
export type DeletePersonAliasMutationFn = Apollo.MutationFunction<DeletePersonAliasMutation, DeletePersonAliasMutationVariables>;

/**
 * __useDeletePersonAliasMutation__
 *
 * To run a mutation, you first call `useDeletePersonAliasMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePersonAliasMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePersonAliasMutation, { data, loading, error }] = useDeletePersonAliasMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePersonAliasMutation(baseOptions?: Apollo.MutationHookOptions<DeletePersonAliasMutation, DeletePersonAliasMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePersonAliasMutation, DeletePersonAliasMutationVariables>(DeletePersonAliasDocument, options);
      }
export type DeletePersonAliasMutationHookResult = ReturnType<typeof useDeletePersonAliasMutation>;
export type DeletePersonAliasMutationResult = Apollo.MutationResult<DeletePersonAliasMutation>;
export type DeletePersonAliasMutationOptions = Apollo.BaseMutationOptions<DeletePersonAliasMutation, DeletePersonAliasMutationVariables>;
export const GetPersonRelationDocument = gql`
    query GetPersonRelation($id: Int!) {
  personRelation(id: $id) {
    id
    description
    persons {
      id
      name
    }
  }
}
    `;

/**
 * __useGetPersonRelationQuery__
 *
 * To run a query within a React component, call `useGetPersonRelationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPersonRelationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPersonRelationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPersonRelationQuery(baseOptions: Apollo.QueryHookOptions<GetPersonRelationQuery, GetPersonRelationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPersonRelationQuery, GetPersonRelationQueryVariables>(GetPersonRelationDocument, options);
      }
export function useGetPersonRelationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPersonRelationQuery, GetPersonRelationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPersonRelationQuery, GetPersonRelationQueryVariables>(GetPersonRelationDocument, options);
        }
export type GetPersonRelationQueryHookResult = ReturnType<typeof useGetPersonRelationQuery>;
export type GetPersonRelationLazyQueryHookResult = ReturnType<typeof useGetPersonRelationLazyQuery>;
export type GetPersonRelationQueryResult = Apollo.QueryResult<GetPersonRelationQuery, GetPersonRelationQueryVariables>;
export const GetPersonRelationsDocument = gql`
    query GetPersonRelations {
  personRelations {
    id
    description
    persons {
      id
      name
    }
  }
}
    `;

/**
 * __useGetPersonRelationsQuery__
 *
 * To run a query within a React component, call `useGetPersonRelationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPersonRelationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPersonRelationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPersonRelationsQuery(baseOptions?: Apollo.QueryHookOptions<GetPersonRelationsQuery, GetPersonRelationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPersonRelationsQuery, GetPersonRelationsQueryVariables>(GetPersonRelationsDocument, options);
      }
export function useGetPersonRelationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPersonRelationsQuery, GetPersonRelationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPersonRelationsQuery, GetPersonRelationsQueryVariables>(GetPersonRelationsDocument, options);
        }
export type GetPersonRelationsQueryHookResult = ReturnType<typeof useGetPersonRelationsQuery>;
export type GetPersonRelationsLazyQueryHookResult = ReturnType<typeof useGetPersonRelationsLazyQuery>;
export type GetPersonRelationsQueryResult = Apollo.QueryResult<GetPersonRelationsQuery, GetPersonRelationsQueryVariables>;
export const CreatePersonRelationDocument = gql`
    mutation CreatePersonRelation($description: String!, $personIds: [Int!]) {
  createPersonRelation(description: $description, personIds: $personIds) {
    id
    description
  }
}
    `;
export type CreatePersonRelationMutationFn = Apollo.MutationFunction<CreatePersonRelationMutation, CreatePersonRelationMutationVariables>;

/**
 * __useCreatePersonRelationMutation__
 *
 * To run a mutation, you first call `useCreatePersonRelationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePersonRelationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPersonRelationMutation, { data, loading, error }] = useCreatePersonRelationMutation({
 *   variables: {
 *      description: // value for 'description'
 *      personIds: // value for 'personIds'
 *   },
 * });
 */
export function useCreatePersonRelationMutation(baseOptions?: Apollo.MutationHookOptions<CreatePersonRelationMutation, CreatePersonRelationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePersonRelationMutation, CreatePersonRelationMutationVariables>(CreatePersonRelationDocument, options);
      }
export type CreatePersonRelationMutationHookResult = ReturnType<typeof useCreatePersonRelationMutation>;
export type CreatePersonRelationMutationResult = Apollo.MutationResult<CreatePersonRelationMutation>;
export type CreatePersonRelationMutationOptions = Apollo.BaseMutationOptions<CreatePersonRelationMutation, CreatePersonRelationMutationVariables>;
export const UpdatePersonRelationDocument = gql`
    mutation UpdatePersonRelation($id: Int!, $description: String!, $personIds: [Int!]) {
  updatePersonRelation(id: $id, description: $description, personIds: $personIds) {
    id
  }
}
    `;
export type UpdatePersonRelationMutationFn = Apollo.MutationFunction<UpdatePersonRelationMutation, UpdatePersonRelationMutationVariables>;

/**
 * __useUpdatePersonRelationMutation__
 *
 * To run a mutation, you first call `useUpdatePersonRelationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePersonRelationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePersonRelationMutation, { data, loading, error }] = useUpdatePersonRelationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      description: // value for 'description'
 *      personIds: // value for 'personIds'
 *   },
 * });
 */
export function useUpdatePersonRelationMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePersonRelationMutation, UpdatePersonRelationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePersonRelationMutation, UpdatePersonRelationMutationVariables>(UpdatePersonRelationDocument, options);
      }
export type UpdatePersonRelationMutationHookResult = ReturnType<typeof useUpdatePersonRelationMutation>;
export type UpdatePersonRelationMutationResult = Apollo.MutationResult<UpdatePersonRelationMutation>;
export type UpdatePersonRelationMutationOptions = Apollo.BaseMutationOptions<UpdatePersonRelationMutation, UpdatePersonRelationMutationVariables>;
export const DeletePersonRelationDocument = gql`
    mutation DeletePersonRelation($id: Int!) {
  deletePersonRelation(id: $id) {
    id
  }
}
    `;
export type DeletePersonRelationMutationFn = Apollo.MutationFunction<DeletePersonRelationMutation, DeletePersonRelationMutationVariables>;

/**
 * __useDeletePersonRelationMutation__
 *
 * To run a mutation, you first call `useDeletePersonRelationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePersonRelationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePersonRelationMutation, { data, loading, error }] = useDeletePersonRelationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePersonRelationMutation(baseOptions?: Apollo.MutationHookOptions<DeletePersonRelationMutation, DeletePersonRelationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePersonRelationMutation, DeletePersonRelationMutationVariables>(DeletePersonRelationDocument, options);
      }
export type DeletePersonRelationMutationHookResult = ReturnType<typeof useDeletePersonRelationMutation>;
export type DeletePersonRelationMutationResult = Apollo.MutationResult<DeletePersonRelationMutation>;
export type DeletePersonRelationMutationOptions = Apollo.BaseMutationOptions<DeletePersonRelationMutation, DeletePersonRelationMutationVariables>;
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
    relations {
      id
      description
      persons {
        id
        name
      }
    }
    activities {
      id
      description
      persons {
        id
        name
      }
    }
    aliases {
      id
      alias
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