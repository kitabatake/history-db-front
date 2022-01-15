import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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
  createPersonRelation: PersonRelation;
  createSource: Source;
  deleteActivity: Activity;
  deletePerson: Person;
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
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  relations: Array<PersonRelation>;
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