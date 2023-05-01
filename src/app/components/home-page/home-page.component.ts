import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Apollo } from 'apollo-angular';
import { Person  } from 'src/app/types/Query';
import { ALL_PEOPLE_QUERY, AllPeopleQueryResponse, FIND_PERSON_BY_ID } from 'src/app/model/Graphql';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [
    trigger('detailExpand', [
    state('collapsed', style({ height: '0px', minHeight: '0' })),
    state('expanded', style({ height: '*' })),
    transition('expanded <=> collapsed', 
    animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  ]),
],
})
export class HomePageComponent implements OnInit {

  columns: any[] = [];
  allPersons:Person[] = [];
  person :Person

  constructor(private apollo: Apollo) { }
  private querySubscription: Subscription;
  columnsToDisplay = ['name', 'height', 'mass', 'homeworld'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Person | null;

  toggleRow(element: { expanded: boolean; }) {
    this.allPersons.forEach(row => {
      element.expanded = !element.expanded

    })
  }

  
  ngOnInit(): void {
    this.querySubscription = this.apollo
    .watchQuery<AllPeopleQueryResponse>({
      query: ALL_PEOPLE_QUERY
    })
    .valueChanges.subscribe((res) => {
      this.allPersons = res.data.fetchAllPersons.results
    })
  }

findByName(element :any){
    this.apollo
    .watchQuery<Person>({
      query: FIND_PERSON_BY_ID,
      variables: {
        name: element.name,
      },
    })
    .valueChanges.subscribe((res) => {
      this.person = res.data
    })
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }


}
   


