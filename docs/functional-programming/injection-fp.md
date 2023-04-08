# Injection in FP

Provide to a function all the dependencies it needs to do its job. This is called injection.

```ts
const mapper = (x) => x * 2;
const doulbled = [1, 2, 3].map(mapper);
```

`map` function needs a mapper function to do its job. We provide it with the `mapper` function. This is called injection.
