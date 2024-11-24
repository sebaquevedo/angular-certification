import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { inject } from "@angular/core"
import { collection, Firestore, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  firestore = inject(Firestore);
  title = 'angular-certification';

  ngOnInit(){
    getDocs(collection(this.firestore, "testPath")).then((response) => {
      console.log(response.docs)
    })
  }
}
