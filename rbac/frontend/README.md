# Concordium dApp template

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Getting started

Install dependencies:

```bash
yarn
```

Start dev server:

```bash
yarn dev
```

Build for production:

```bash
yarn build
```

## Development

### Styling

The template uses bootstrap, which is themed in the scss files placed in `src/scss`. More information about customizing bootstrap can be found [here](https://getbootstrap.com/docs/5.0/customize/overview/).
Bootstrap components can be used by importing components from [`react-boostrap`](https://react-bootstrap.netlify.app/).
When a new bootstrap component is used, the corresponding bootstrap component scss file should be imported and (ideally) themed.

#### Example: Using a bootstrap card

```ts
// src/components/SomeComponent.tsx
import { Card } from 'react-bootstrap';

export default function SomeComponent() {
    return <Card>...</Card>;
}
```

```scss
// src/scss/layout/_card.scss
@import "bootstrap/scss/card";

// Theming by overriding
.card {
    ...
}
```

```scss
// src/scss/_layout.scss
...
@import "layout/card";
```
