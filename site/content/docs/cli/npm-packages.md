---
title: Using NPM packages and local dependencies - Checkly Docs
displayTitle: Using NPM packages and local dependencies
navTitle: NPM packages & local dependencies
weight: 8
menu:
  platform:
    parent: "CLI"
---

Checkly lets you use JavaScript / TypeScript in your Browser and Multistep checks, and in API check setup & teardown scripts.
Checks are able to use NPM packages that are defined in [our runtimes](/docs/runtimes/specs/), as well as import local JavaScript and TypeScript files.


## NPM packages

> Not all NPM packages from NPM are available inside the context of a Check.

The JavaScript code for checks executes in a runtime environment managed by Checkly.
Runtime versions can be selected by setting a `runtimeId`.
This can be configured at the check and group level using constructs, and a default value for the project can be set in the [project configuration file](/docs/cli/project-structure/#global-configuration).
The latest runtime is `2024.02` at the time of writing. This runtime contains among others:

- Nodejs 18.x
- `@playwright/test 1.42.1`
- `axios 0.28.0`
- `lodash 4.17.21`
- `moment 2.30.1`

...and a range of other popular NPM package to help you write and assert checks.

- [Browse the latest runtime specs](/docs/runtimes/specs/)
- [Learn more about runtimes](/docs/runtimes/)

## Local Dependencies

Your checks are also able to import other JavaScript and TypeScript files as dependencies.
This is useful for defining helper functions to be reused across multiple checks.
The Checkly CLI will automatically detect these dependencies and make sure that they're bundled as part of the check.
No additional configuration is needed, and there's no need to create [Snippets](/docs/snippets/) in your account.

Here is an example of how this works in practice. This example shows a Browser check, but the idea applies to other check types as well.

The directory tree looks like the following:
```
__checks__
├── login.check.ts
├── login.spec.ts
└── login-helper.ts
```

In `login-helper.ts` we define a reusable function `gitHubLogin`. This function can be used by multiple Browser checks.
```ts {title="login-helper.ts"}
export async function gitHubLogin (page, username, password) {
  await page.goto('https://github.com/login')
  await page.getByLabel('Username or email address').type(username)
  await page.getByLabel('Password').type(password)
  await page.getByRole('button', { name: 'Sign in' })
}
```

In `login.spec.ts` we define the actual Playwright test. This file can import the `gitHubLogin` function from `login-helper.ts`. It also reads the username and password from [remote environment variables](/docs/cli/using-environment-variables/#remote-environment-variables).
```ts {title="loging.spec.ts"}
// @ts-ignore
import { test } from '@playwright/test'
import { gitHubLogin } from './login-helper'

test('Github login', async ({ page }) => {
  await gitHubLogin(page, process.env.GITHUB_USER, process.env.GITHUB_PWD)

  // your normal check code
  await page.click('.header-search-input')
})
```

Finally, in `login.check.ts` we define the [BrowserCheck construct](/docs/cli/constructs-reference/#browsercheck). Note that it's only necessary to configure the main Playwright file `login.spec.ts`. The dependency on `login-helper.ts` is automatically detected by the CLI.
```ts {title="login.check.ts"}
import { BrowserCheck } from 'checkly/constructs'

new BrowserCheck('login-check', {
  name: 'Login Check',
    code: { entrypoint: './login.spec.ts' }
  })
})
```

After running [`npx checkly deploy`](/docs/cli/command-line-reference/#npx-checkly-deploy) to deploy the project, we can see in the Web UI that the helper file `login-helper.ts` was also uploaded for the check.

![login check with helper file in dependencies](/docs/images/cli/github_login_helper_dependency.png)

The maximum total size of a Checkly project when deploying or running a test session, including local dependencies, is 40 MB.

## Why can't I import any NPM package or other 3rd party dependencies?

Great question! Please see [this paragraph in our runtime docs](/docs/runtimes/#why-cant-i-import-any-npm-package-or-other-3rd-party-dependencies).

In short:

1. Our runtime architecture is not a full CI platform for reasons of size, complexity and security.
2. Having said that, please file a feature request over at [feedback.checklyhq.com](https://feedback.checklyhq.com/) if 
you feel we are missing a crucial package.
