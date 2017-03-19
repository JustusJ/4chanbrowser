git filter-branch --commit-filter '
export GIT_COMMITTER_NAME="JustusJ";\
export GIT_COMMITTER_EMAIL="JustusJ@mailinator.com";\
export GIT_AUTHOR_NAME="JustusJ";\
export GIT_AUTHOR_EMAIL="JustusJ@mailinator.com";\
git commit-tree "$@";' -- --all

# git log --pretty=format:"%cn %an %ae %ce %h" --reflog
# git for-each-ref --format="%(refname)" refs/original/ | xargs -n 1 git update-ref -d
# git reflog expire --expire-unreachable=now --all
# git gc --prune=now
