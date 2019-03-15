---
title: Angular 6+
category: JavaScript Framework
intro: | 
[Angular](https://angular.io/) is a Javascript framework. This guide targets Angular v6+
---

## Angular Cli commands
```cmd
    npm install -g @angular/cli
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