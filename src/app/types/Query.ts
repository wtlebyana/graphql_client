export class Person {
    name?: String
    height?: String
    mass?: String
    gender?: String
    homeworld?: String
    hair_color?:String
    skin_color?:String
    eye_color?:String
    birth_year?:String
}

export class ResponseDataType {
    count: number
    next: String
    results: Person[]
}
export type Query ={
    fetchAllPersons: ResponseDataType;
    fetchPersonByName:Person
}