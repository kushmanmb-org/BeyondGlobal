# Contributing to BeyondGlobal

Thank you for your interest in contributing to BeyondGlobal! This document provides guidelines for contributing to the project.

## 🤖 Automated Collaboration

This repository uses **Kairos bot** and **GitHub Copilot** working together to ensure code quality and security. When you submit a pull request:

1. **Automated checks** run (CI/CD, tests, security scans)
2. **Kairos bot** performs code quality analysis
3. **GitHub Copilot** provides code suggestions and reviews
4. **Human maintainers** provide final review and approval

## 📋 Before You Start

### Required Reading

Please read these documents before contributing:

- **[POLICY.md](./POLICY.md)** - Security and governance policies
- **[OWNERSHIP.md](./OWNERSHIP.md)** - Repository ownership and responsibilities
- **[SECURITY.md](./SECURITY.md)** - Security practices and vulnerability reporting
- **[LICENSE](./LICENSE)** - MIT License with configuration terms

### Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please:

- Be respectful and constructive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/BeyondGlobal.git
cd BeyondGlobal
```

### 2. Set Up Development Environment

```bash
# Install dependencies
yarn install

# Run tests to ensure everything works
yarn test

# Run the application
yarn start
```

### 3. Create a Branch

```bash
# Create a new branch for your feature or fix
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-number-description
```

### Branch Naming Conventions

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `security/` - Security fixes
- `refactor/` - Code refactoring
- `test/` - Test additions or fixes

## 💻 Development Guidelines

### Code Style

- Use modern JavaScript (ES6+)
- Follow existing code style and conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Security Requirements

**Never commit secrets!**

```bash
# ✅ Good - Use environment variables
const apiKey = process.env.ETHERSCAN_API_KEY;

# ❌ Bad - Never hardcode secrets
const apiKey = "abc123xyz789";
```

### Testing

```bash
# Run all tests
yarn test

# Test your changes thoroughly
node index.js
```

### Commits

Write clear, descriptive commit messages:

```bash
# ✅ Good
git commit -m "Add input validation for Etherscan API queries"

# ❌ Bad
git commit -m "fix stuff"
```

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `security`: Security fixes

Example:
```
feat: Add support for multiple Ethereum networks

- Add network configuration options
- Update API calls to support different chainIds
- Add tests for new functionality

Closes #123
```

## 📝 Submitting Changes

### 1. Test Your Changes

```bash
# Ensure all tests pass
yarn test

# Run security checks
yarn audit

# Test the application manually
yarn start
```

### 2. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: Add feature description"
```

### 3. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 4. Create a Pull Request

1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill out the PR template completely
5. Submit the pull request

### Pull Request Checklist

Before submitting your PR, ensure:

- [ ] Code follows the project's style guidelines
- [ ] All tests pass
- [ ] No secrets or credentials are committed
- [ ] Documentation is updated (if needed)
- [ ] Commit messages are clear and descriptive
- [ ] PR description explains what and why
- [ ] Security implications are considered
- [ ] Dependencies are secure (no vulnerabilities)

## 🔍 Review Process

### What to Expect

1. **Automated Checks** (~5 minutes):
   - CI/CD pipeline runs
   - Tests execute
   - Security scans run
   - Code quality checks

2. **Bot Review** (~10 minutes):
   - Kairos bot analyzes code
   - Copilot provides suggestions
   - Automated feedback posted

3. **Human Review** (1-3 days):
   - Maintainer reviews code
   - Feedback provided
   - Discussion if needed

4. **Merge** (after approval):
   - All checks pass
   - Maintainer approval received
   - Changes merged to main branch

### Addressing Feedback

- Respond to all review comments
- Make requested changes promptly
- Push updates to your PR branch
- Re-request review when ready

```bash
# Make changes based on feedback
git add .
git commit -m "Address review feedback"
git push origin feature/your-feature-name
```

## 🐛 Reporting Bugs

Use the [Bug Report template](./.github/ISSUE_TEMPLATE/bug_report.md):

1. Go to Issues → New Issue
2. Select "Bug Report"
3. Fill out the template completely
4. Submit the issue

## 💡 Suggesting Features

Use the [Feature Request template](./.github/ISSUE_TEMPLATE/feature_request.md):

1. Go to Issues → New Issue
2. Select "Feature Request"
3. Describe the feature and its benefits
4. Submit the request

## 🔒 Reporting Security Issues

**Do NOT open public issues for security vulnerabilities!**

Follow the process in [SECURITY.md](./SECURITY.md):

1. Use GitHub Security Advisories
2. Or contact maintainers privately
3. Allow time for remediation
4. Public disclosure after fix is deployed

## 📚 Documentation

### Updating Documentation

- Update README.md for user-facing changes
- Update code comments for complex logic
- Add examples for new features
- Update POLICY.md or OWNERSHIP.md if governance changes

### Documentation Style

- Use clear, concise language
- Include code examples
- Add links to related documentation
- Use proper Markdown formatting

## 🎯 Areas for Contribution

We welcome contributions in these areas:

### Code

- Bug fixes
- New features
- Performance improvements
- Code refactoring
- Test coverage improvements

### Documentation

- README improvements
- Code examples
- API documentation
- Tutorials and guides
- Translation

### Testing

- Unit tests
- Integration tests
- Security tests
- Performance tests

### Security

- Security audits
- Vulnerability fixes
- Security documentation
- Best practices implementation

## 🏆 Recognition

Contributors are recognized in:

- Git commit history
- Pull request comments
- Release notes
- Project documentation

Thank you for contributing! 🎉

## 📞 Getting Help

If you need help:

1. **Check existing documentation** - README, POLICY, etc.
2. **Search existing issues** - Your question may be answered
3. **Open a discussion** - For questions and ideas
4. **Ask in PR comments** - For PR-specific questions
5. **Contact maintainers** - Listed in OWNERSHIP.md

## 📄 License

By contributing to BeyondGlobal, you agree that your contributions will be licensed under the MIT License. See [LICENSE](./LICENSE) for details.

---

**Thank you for contributing to BeyondGlobal!** 🚀
