# plentific-playwright-typescript

You can run your tests with "npm run test" on console, and you can choose which test you want on playwright.config file.

Also you can run your tests on docker with this commands;

  - docker build -t playwright-docker .
  - docker run -it playwright-docker:latest npm run test

Additon to run tests,
There is github action file. You can find it at workflows. With this CI/CD, also you can run your test which is defined on github.config file.
