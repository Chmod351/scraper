![Screenshot_from_2023-08-02_14-38-24-removebg-preview](https://github.com/yamilt351/scraper/assets/88646148/9788c6da-e1f1-4110-b75a-1748b5f7af23)

## Non-Code Contributions 👍

We **believe** that **open-source** projects thrive **not only** through code contributions but also through a **diverse range of non-code contributions**. Your involvement and expertise in various areas can greatly enhance the project and its community. Here are some ways you can contribute beyond writing code:

- **Documentation 📑 :** Improve, expand project documentation to make it more comprehensive and accessible.
- **Design and User Experience 🎨:** Help create an intuitive user interface, design graphics, or enhance the overall user experience.
- **Quality Assurance ⚒️ :** Assist in testing the software, identifying bugs, and ensuring the project functions correctly across different environments.
- **Issue Management 📬 :** Help categorize issues, organize feature requests, track pending tasks, and maintain an up-to-date task list.
- **Performance Optimization 📊 :** Collaborate on improving code performance and optimization to make the project faster and more efficient.
- **Accessibility Improvement 🛟 :** Work on making the project more accessible to individuals with disabilities, ensuring it adheres to web accessibility standards.
- **Art and Graphics 👨‍🎨 :** Contribute illustrations, graphics, icons, or other visual elements that can enhance the overall presentation of the project.

We appreciate your commitment to making this project a success, and we welcome your contributions in all forms. Your involvement helps create a vibrant and inclusive open-source community.

Thank you for being part of our journey!

# Code Contributing Guidelines 📌

Thank you for considering contributing to this project! We appreciate your time and effort. Please take a moment to review the following guidelines to ensure a smooth and effective collaboration.


1. Install [Nodejs](https://nodejs.org/en) v20 (check your node version with `node -v`)
2. Fork the `development branch` repository and clone it to your local machine.
3. Create your `.env` file with these values:

```
PORT=5000
URL_SERVER=https://url.com
LIMIT=2000
MONGOOSE_USER=mongodb+srv://{YOUR_USER}:{YOUR_PASSWORD}@cluster0.4g3ly.mongodb.net/?retryWrites=true&w=majority

```
`MONGOOSE_USER` :  you **only need's** a db user **if you are gonna change** something related to the db** or wanna try the project in a local env.

4. Install dependencies with `npm i`
5. Create a new branch for your contribution.
6. Make your changes, [commit](#Commit-Message-Structure) them with clear and descriptive messages, and push the branch to your forked repository
7. Test your changes `npm run test` (only if your commit has backend stuff).
8. Submit a pull request with evidences at Development, explaining the purpose and details of your contribution.
9. Code Styles are provided by [eslint](https://github.com/neoclide/coc-eslint) & [prettier](https://github.com/neoclide/coc-prettier)

- Yours Pull Requests should follow the next structure (the repo has a boilerplate to do that):
  - As (`Developer`)
  - I want to (`Your changes`)
  - To (`Feature`)
  - Happy path (`succesfull case screenshoot`)
  - Unhappy path (`unsuccesfull case screenshots , more than 1 if applies`)

The application was tested with [Jest](https://jestjs.io/docs/getting-started), [Chai](https://www.chaijs.com/) and [Supertest](https://github.com/visionmedia/supertest)

- to run integration test:
  `npm run test:integration`
- to run unit tests:
  `npm run test:unit`
- to run the whole test:
  `npm run test`
  

  
## Commit Message Structure 📝 <a name="Commit-Message-Structure"></a>

Please follow the commit message structure below:

- `type:`: The type of the commit (e.g., feature, bug fix, documentation, resolve, etc)
- `description`: A concise description of the changes made.(optional)
- `[#issue]`: Related issue to that task.

## Using Issues 🖇️

We use GitHub issues to track tasks and enhancements. If you find a bug, have a feature request, or want to suggest an improvement, please create a new issue. Follow these steps:

1. Go to the [Issues](https://github.com/yamilt351/scraper/issues) section of the repository.
2. Click on "New Issue" and provide a clear and descriptive title.
3. Fill in the issue template with all the necessary details, including steps to reproduce (if applicable).
4. We have different's boilerplates to issues, be sure to choose the correct one.

 ## Code Review Process 🔍

All contributions will go through a code review process to ensure code quality and maintainability. Here's how it works:

1. Submit a pull request with your changes.
2. If your changes does not break any old code, your pr will be merged, in case your Pr is incorrect we will leave a comment in your pr
3. Make the necessary changes based on the feedback received.
4. Once the code is approved, it will be merged into the main branch.

## Code of Conduct ⛔

Please note that this project follows a code of conduct. We expect all contributors to adhere to the guidelines outlined in the [Code of Conduct](./CODE_OF_CONDUCT.md).

Thank you for your contributions and happy coding!
