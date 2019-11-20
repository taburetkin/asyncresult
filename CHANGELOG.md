# v1.1.2, 2019-11-20
## enhacement
- `addAsync` now respects classes
```js
addAsync(MyClass, 'someMethod') - will add `someMethodAsync` to prototype

addAsync(MyClass, 'someMethod', { static: true }) - will add `someMethodAsync` to MyClass as static

```

# v1.1.1, 2019-11-20
## fix
- Static methods `AsyncResult.success` and `AsyncResult.fail` now respects derived AsyncResult class

# v1.1.0, 2019-06-17
## enhancements:
- added type script definitions.
## additional
- code base now uses spaces instead of tabs.
