import { Person, ResponseDataType } from '../types/Query';
import gql from 'graphql-tag'

export const ALL_PEOPLE_QUERY = gql`
  query {
    fetchAllPersons{
        results{
          name
          mass
          height
          homeworld
      }
    }
}`;

export const FIND_PERSON_BY_ID = gql `
query {
  fetchPersonByName(name: string){
      name
      mass
      height
      homeworld
  }
}`;

export interface AllPeopleQueryResponse {
  fetchAllPersons: ResponseDataType;
}
export interface PersonQueryResponse{
    fetchPersonByName:Person
}