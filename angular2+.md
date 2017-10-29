### Decorator Definitions
---

### Component (imports)

```
import { Component } from '@angular/core';

@Component({
  selector: 'example-name',
  styleUrls: [
    'example-name.component.scss',
    'additional-styles.scss'
  ],
  templateUrl: 'example-name.component.html'
})
export class ExampleNameComponent {
  constructor() {}
}
```

### Component (inline)

```
import { Component } from '@angular/core';

@Component({
  selector: 'example-name',
  styles: [`
    .container {
      color:#ff0066;
    }
  `],
  template: `
    <div class="container"></div>
  `
})
export class ExampleNameComponent {
  constructor() {}
}
```

### NgModule

```
import { NgModule } from '@angular/core';

@NgModule({
  imports: [],       // other modules, etc
  declarations: [],  // components, pipes, directives, etc
  providers: [],     // services, etc
  exports: []        // anything which will be consumed by other elements outside the scope of the current ngModule
})
export class ExampleModule {}
```

### NgModule (with imports)

```
import { NgModule } from '@angular/core';

import { SecondModule } from '../second/second.module';   // (.ts extension not needed)

import { ExampleNameComponent } from '../components/example-name/example-name.component';
import { ExamplePipe } from '../pipes/example-pipe/example-pipe.pipe';
import { ExampleDirective } from '../directives/example-directive/example-directive.directive';

import { ExampleService } from '../services/example.service';

@NgModule({
  imports: [        // other modules, etc
    SecondModule
  ],
  declarations: [   // components, pipes, directives, etc
    ExampleNameComponent,
    ExamplePipe,
    ExampleDirective
  ],
  providers: [       // services, etc
    ExampleService
  ]
})
export class ExampleModule {}
```

### Injectable (Service)

```
import { Injectable } from '@angular/core';

@Injectable()
export class ExampleService {
  constructor() {}
}
```

### Pipe

```
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'example-pipe'
})
export class ExamplePipe implements PipeTransform {
  transform(value: any) {
    // apply transformation(s) to "value"
  }
}
```
