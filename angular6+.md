---
title: Angular 6+
category: JavaScript Framework
intro: | 
[Angular](https://angular.io/) is a Javascript framework. This guide targets Angular v6+
---

## Angular Cli commands

```cmd
    npm install -g @angular/cli  // install angular cli
    ng new hello-app  // create a new angular app
    ng serve //command to build the app and run it locally

    ng generate
        ng generate component helloComponent // creates a new component
        ng generate directive helloDirective  //creates a new directive
        ng generate module helloModule //creates a new module
        ng g module HelloModule --routing // creates a new module with a routing module
        ng generate pipe helloPipe //creates a new pipe
        ng generate service helloService //creates a new service
```

### Components

```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```

### Using a component

```html
<body>
  <app-hello></app-hello>
</body>
```

### Modules

```ts
import { HelloComponent } from './helloComponent';

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  providers: [
  ],
})
export class AppModule { }
```

### Routing

```ts
import { helloComponent } from './helloComponent';

const routes: Routes = [
  {
    path: 'hello',
    component: 'helloComponent',
    canActivate: []
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

### Using the Routes

```html
<nav>
  <a routerLink="/hello">Hello</a>
</nav>
<router-outlet></router-outlet>
```

### Service

```ts
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class HelloService {

    constructor(private http: HttpClient) {}

    sendHello(details) {
        interface ApiResponse {
            status;
            message;
            token;
        }
        const headers = new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'));
        return this.http.post<ApiResponse>('/api/hello', details, {headers: headers});
    }

}
```

### Pipes

```ts
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'countdown',
    pure: true
})

export class CountdownPipe implements PipeTransform {
  transform(text: string, args: number) {
    const maxLength = args || 0;
    const length = text.length;

    return (maxLength - length);
  }
}
```

### Using Pipes

```html
<span>{{myText | countdown:420}}</span>
```