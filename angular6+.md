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