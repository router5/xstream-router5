[![npm version](https://badge.fury.io/js/router5-xstream.svg)](https://badge.fury.io/js/router5-xstream)
[![Build Status](https://travis-ci.org/router5/router5-xstream.svg?branch=master)](https://travis-ci.org/router5/router5-xstream?branch=master)
[![Coverage Status](https://coveralls.io/repos/router5/router5-xstream/badge.svg?branch=master&service=github)](https://coveralls.io/github/router5/router5-xstream?branch=master)

__NOT PUBLISHED YET__: waiting for router5 4.0.0 to be published

# router5-xstream

[xstream](http://staltz.com/xstream/) plugin for [router5](http://router5.github.io)

```sh
npm install --save router5-xstream
```

### Usage

```js
import xsPlugin from 'router5-xstream';

router
    .usePlugin(xsPlugin());
    .start(());

router.xs.route$.map((route) => { /* ... */ })
```

### Available observables

This plugin adds a `xs` object to your router instance, containing the following:
- `route$`: an observable of your application route
- `transitionRoute$`: an observable of the currently transitioning route
- `transitionError$`: an observable of transition errors
- `routeNode(nodeName)`: a function returning an observable of route updates for the specified node. See [understanding router5](http://router5.github.io/docs/understanding-router5.html).

### Contributing

Please read [contributing guidelines](https://github.com/router5/router5/blob/master/CONTRIBUTING.md) on router5 repository.
