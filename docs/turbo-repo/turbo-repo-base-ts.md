# Initialise a `turbo-repo` with base config for Typescript apps

The following need `bash` to run. You can copy/paste the commands and they should run.

Alternatively you can run the commands manually in your own terminal.

> Note: In the first batch of commands replace `turbo-ts-base` with the name of your repo.

## Initialise the repo

```bash
MY_REPO=turbo-ts-base &&
mkdir $MY_REPO &&
cd $MY_REPO &&
pnpm init &&
git init
```

## Add subdirectories

```bash
mkdir apps &&
mkdir apps/cli &&
mkdir packages &&
mkdir packages/eslint-config-custom &&
mkdir packages/tsconfig
```

## Add `.gitignore`

```bash
cat << EOF > .gitignore
# dependencies
node_modules
.pnp
.pnp.js

# testing
coverage

# next.js
.next/
out/
build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# local env files
.env.local
.env.development.local
.env.test.local
.env.production.local

# turbo
.turbo

# editors
.idea
.vscode
EOF
```

## Add `.eslintrc.js`

```bash
cat << EOF > .eslintrc.js
module.exports = {
    root: true,
    extends: ["custom"],
};
EOF
```

## Edit `package.json`:

Edit the `version` to match your project version.

Update the `package.json` with the following

```json
{
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint",
    "format": "prettier --write \"**/*.{ts,tsx,md}\"",
    "pretty-quick": "pretty-quick"
  }
}
```

## Create `pnpm-workspace.yaml

```bash
cat << EOF > pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
EOF
```

## Create `.prettierrc.json`

```bash
cat << EOF > .prettierrc.json
{
  "singleQuote": true
}
EOF
```

## Create `turbo.json`

```bash
cat << EOF > turbo.json
{
  "\$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false
    }
  }
}
EOF
```

## Add `husky` and `pre-commit`

```bash
pnpm add -wD @types/node turbo prettier pretty-quick husky &&
pnpm husky install &&
pnpm dlx husky add .husky/pre-commit "pnpm pretty-quick --staged"
```

## Add base `tsconfig`

```bash
cat << EOF > packages/tsconfig/base.json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "Default",
  "compilerOptions": {
    "composite": false,
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "inlineSources": false,
    "isolatedModules": true,
    "moduleResolution": "node",
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "preserveWatchOutput": true,
    "skipLibCheck": true,
    "strict": true
  },
  "exclude": ["node_modules"]
}
EOF
```

## Export base `tsconfig`

```bash
cat << EOF > packages/tsconfig/package.json
{
  "name": "tsconfig",
  "version": "0.0.0",
  "private": true,
  "files": [
    "base.json"
  ]
}
EOF
```

## Add custom `eslint-config`:

```bash
cat << EOF > packages/eslint-config-custom/index.js
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'turbo',
    'prettier',
  ],
  rules: {
    "no-console": "error",
  }
};
EOF
```

## Prepare the `eslint-config` repo

```bash
cd packages/eslint-config-custom &&
pnpm init &&
pnpm add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint typescript &&
pnpm add eslint-config-prettier eslint-config-turbo@latest &&
cd ../../
```

Update `packages/eslint-config-custom/package.json`:

```json
{
  "publishConfig": {
    "access": "public"
  }
}
```

Add to package.json:
Add to package.json:

```json
{
  "devDependencies": {
    "eslint-config-custom": "workspace:*"
  }
}
```

## Update packages

```bash
pnpm install
```

## Add a template typescript app

```bash
cd apps/cli &&
pnpm init &&
cd ../../
```

Edit in `apps/cli/package.json`:

- version

Add to `apps/cli/package.json`:

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "lint": "tsc --noEmit && eslint . --ext .ts,.tsx",
    "dev": "nodemon index.ts"
  },
  "devDependencies": {
    "tsconfig": "workspace: *"
  }
}
```

Extend base `tsconfig`

```bash
cat << EOF > apps/cli/tsconfig.json
{
  "extends": "tsconfig/base.json"
}
EOF
```

Install dependencies

```bash
cd apps/cli &&
pnpm add -D @types/node nodemon ts-node typescript
cd ../../
```
