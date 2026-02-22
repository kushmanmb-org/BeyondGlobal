# Branch Protection Rules

## Overview

This document outlines the branch protection rules that should be configured for the BeyondGlobal repository to ensure code quality, security, and proper governance.

## Protected Branches

The following branches require protection:

### Main Branch (`main`)

The primary development branch where all features are integrated.

### Production Branch (`production`)

Branch used for production deployments (if applicable).

### Release Branches (`release/*`)

Branches for specific releases that require stability.

## Required Protection Rules

### 1. Require Pull Request Reviews Before Merging

**Settings**:
- ✅ **Required approving reviews**: 1 minimum
- ✅ **Dismiss stale pull request approvals when new commits are pushed**
- ✅ **Require review from Code Owners** (when CODEOWNERS file exists)
- ✅ **Restrict who can dismiss pull request reviews**: Maintainers only

**Purpose**: Ensures all code changes are reviewed by at least one other person before being merged, maintaining code quality and catching potential issues.

### 2. Require Status Checks to Pass Before Merging

**Required Status Checks**:
- ✅ **CI/CD Build**: Code must build successfully
- ✅ **Tests**: All tests must pass
- ✅ **Linting**: Code style checks must pass
- ✅ **Security Scan**: No high/critical vulnerabilities
- ✅ **Dependency Check**: Dependencies must be secure

**Settings**:
- ✅ **Require branches to be up to date before merging**
- ✅ **Status checks must pass before merging**

**Purpose**: Prevents broken or insecure code from being merged into protected branches.

### 3. Require Signed Commits

**Settings**:
- ✅ **Require signed commits**: All commits must be GPG signed (recommended for production)
- ⚠️ **Optional for development**: Can be optional for `main` branch depending on team preference

**Purpose**: Ensures commit authenticity and prevents impersonation.

### 4. Prevent Force Pushes

**Settings**:
- ✅ **Do not allow force pushes**: Force pushes are prohibited
- ✅ **Applies to everyone**: Including administrators

**Purpose**: Protects git history from being rewritten, which could cause data loss or confusion.

### 5. Prevent Deletions

**Settings**:
- ✅ **Do not allow deletions**: Branch cannot be deleted
- ✅ **Applies to everyone**: Including administrators

**Purpose**: Prevents accidental deletion of important branches.

### 6. Require Linear History

**Settings**:
- ✅ **Require linear history**: Prevents merge commits
- ✅ **Enforce via squash merging or rebasing**

**Purpose**: Maintains a clean, linear git history that's easier to understand and debug.

### 7. Include Administrators

**Settings**:
- ✅ **Include administrators**: Rules apply to repository administrators
- ⚠️ **Allow administrators to bypass**: Can be enabled for emergency situations only

**Purpose**: Ensures consistent application of rules, even for administrators.

### 8. Restrict Who Can Push

**Settings**:
- ✅ **Restrict who can push to matching branches**: Only maintainers can push
- ✅ **Allow specified actors**: Defined list of maintainers and bots
- ✅ **Allowed bots**: 
  - GitHub Actions bot
  - Copilot bot
  - Kairos bot (when configured)

**Purpose**: Limits direct push access to trusted maintainers and authorized bots.

## Applying Branch Protection Rules

### Via GitHub Web Interface

1. Navigate to repository **Settings**
2. Click **Branches** in the left sidebar
3. Click **Add branch protection rule**
4. Enter branch name pattern (e.g., `main`, `release/*`)
5. Configure all settings as specified above
6. Click **Create** or **Save changes**

### Via GitHub CLI

```bash
# Example for main branch
gh api repos/{owner}/{repo}/branches/main/protection \
  --method PUT \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field required_status_checks='{"strict":true,"contexts":["ci","tests","lint","security"]}' \
  --field enforce_admins=true \
  --field restrictions=null \
  --field required_linear_history=true \
  --field allow_force_pushes=false \
  --field allow_deletions=false
```

### Via Terraform (Infrastructure as Code)

```hcl
resource "github_branch_protection" "main" {
  repository_id = github_repository.repo.id
  pattern       = "main"

  required_pull_request_reviews {
    required_approving_review_count = 1
    dismiss_stale_reviews          = true
    require_code_owner_reviews     = true
  }

  required_status_checks {
    strict = true
    contexts = [
      "ci",
      "tests",
      "lint",
      "security",
    ]
  }

  enforce_admins     = true
  allows_deletions   = false
  allows_force_pushes = false
  require_signed_commits = false  # Optional, set to true for production
  required_linear_history = true
}
```

## Bot Configuration for Protected Branches

### Allowed Bots and Their Permissions

#### GitHub Actions Bot

- **Purpose**: CI/CD automation
- **Permissions**: Can push to protected branches via workflows
- **Authentication**: Via `GITHUB_TOKEN` in workflows

#### Copilot Bot

- **Purpose**: Code suggestions and automated improvements
- **Permissions**: Can create PRs, comment on issues/PRs
- **Restrictions**: Cannot merge without human approval

#### Kairos Bot

- **Purpose**: Testing, security analysis, and quality checks
- **Permissions**: Can create PRs, run checks, comment on results
- **Restrictions**: Cannot merge without human approval

### Bot Workflow Integration

Bots should work together in the following workflow:

```
Developer creates PR
    ↓
GitHub Actions runs CI/CD
    ↓
Copilot provides code suggestions
    ↓
Kairos performs security analysis
    ↓
Both bots comment on PR
    ↓
Human reviewer approves
    ↓
Auto-merge (if configured) or manual merge
```

## Exceptions and Emergency Procedures

### When to Bypass Protection Rules

Branch protection rules should **rarely** be bypassed. Valid reasons include:

1. **Security Emergency**: Critical security vulnerability requiring immediate fix
2. **Production Incident**: Site-down scenario requiring urgent hotfix
3. **Bot Failure**: CI/CD system failure preventing normal merge process

### Emergency Bypass Procedure

1. **Document Reason**: Create issue documenting why bypass is needed
2. **Owner Approval**: Repository owner must approve
3. **Make Change**: Bypass protection and make necessary change
4. **Immediate Review**: Create PR immediately after for post-hoc review
5. **Document Action**: Update issue with actions taken
6. **Re-enable Protection**: Ensure protection is re-enabled immediately

### Audit Trail

All protection bypasses must be:
- Documented in GitHub issues
- Noted in commit messages
- Reviewed in next maintainer meeting
- Included in quarterly security audit

## Monitoring and Compliance

### Regular Audits

Branch protection compliance should be audited:
- **Monthly**: Review protection settings
- **Quarterly**: Full audit of all bypasses and exceptions
- **After Incidents**: Review after any security incident

### Compliance Checks

```bash
# Check branch protection status
gh api repos/{owner}/{repo}/branches/main/protection

# List recent force pushes (should be empty)
git log --reflog --all | grep "force"

# Review who has push access
gh api repos/{owner}/{repo}/collaborators
```

### Enforcement

Non-compliance with branch protection rules may result in:
- PR rejection
- Revocation of push access
- Maintainer status review
- Security incident investigation

## Updates to Protection Rules

### Proposing Changes

To propose changes to branch protection rules:

1. Create issue with proposed changes
2. Explain rationale and benefits
3. Allow 7-day comment period
4. Discuss with maintainers
5. Owner approval required
6. Update this document
7. Apply new rules to repository

### Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2026-02-22 | Initial branch protection rules | Kushmanmb |

---

**Last Updated**: 2026-02-22  
**Version**: 1.0.0  
**Maintained By**: Repository Maintainers

## References

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [POLICY.md](../POLICY.md)
- [OWNERSHIP.md](../OWNERSHIP.md)
