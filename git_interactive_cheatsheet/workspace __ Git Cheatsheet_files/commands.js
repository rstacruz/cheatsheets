/*
var canonize = function (k) {
  return k.replace(/\[.*\]/, '').replace(/<[^>]+>/g, 'x').toLowerCase().trim()
}
*/
var locations = ["stash", "workspace", "index", "local_repo", "remote_repo"]

var commands = [
  {"left": "workspace",
    "right": "index",
    "direction": "status",
    "key": "status",
    "tags": "Basic Snapshotting"},
  {"left": "workspace",
    "right": "index",
    "direction": "status",
    "key": "diff",
    "tags": "Basic Snapshotting, Inspection and Comparison,Patching"},
  {"left": "workspace",
    "right": "local_repo",
    "direction": "status",
    "key": "diff x",
    "tags": "Basic Snapshotting,Inspection and Comparison,Patching"},
  {"left": "workspace",
    "right": "index",
    "direction": "up",
    "key": "add x",
    "tags": "Basic Snapshotting"},
  {"left": "workspace",
    "right": "index",
    "direction": "up",
    "key": "add -u",
    "tags": "Basic Snapshotting"},
  {"left": "workspace",
    "right": "index",
    "direction": "up",
    "key": "rm x",
    "tags": "Basic Snapshotting"},
  {"left": "workspace",
    "right": "index",
    "direction": "up",
    "key": "mv x",
    "tags": "Basic Snapshotting"},
  {"left": "workspace",
    "right": "local_repo",
    "direction": "up",
    "key": "commit -a",
    "tags": "Basic Snapshotting"},
  {"left": "workspace",
    "right": "index",
    "direction": "dn",
    "key": "checkout x",
    "tags": "Branching and Merging"},
  {"left": "index",
    "right": "index",
    "direction": "status",
    "key": "reset head x",
    "tags": "Basic Snapshotting"},
  {"left": "index",
    "right": "local_repo",
    "direction": "dn",
    "key": "reset --soft head^",
    "tags": "Basic Snapshotting"},
  {"left": "workspace",
    "right": "local_repo",
    "direction": "dn",
    "key": "reset --hard",
    "tags": "Basic Snapshotting"},
  {"left": "workspace",
    "right": "local_repo",
    "direction": "dn",
    "key": "checkout b",
    "tags": "Branching and Merging"},
  {"left": "workspace",
    "right": "local_repo",
    "direction": "dn",
    "key": "checkout -b x",
    "tags": "Branching and Merging"},
  {"left": "workspace",
    "right": "local_repo",
    "direction": "dn",
    "key": "merge x",
    "tags": "Branching and Merging"},
  {"left": "workspace",
    "right": "local_repo",
    "direction": "dn",
    "key": "rebase x",
    "tags": "Patching"},
  {"left": "workspace",
    "right": "local_repo",
    "direction": "dn",
    "key": "cherry-pick x",
    "tags": "Patching"},
  {"left": "workspace",
    "right": "local_repo",
    "direction": "dn",
    "key": "revert x"},
  {"left": "index",
    "right": "local_repo",
    "direction": "status",
    "key": "diff --cached",
    "tags": "Basic Snapshotting,Inspection and Comparison,Patching"},
  {"left": "index",
    "right": "local_repo",
    "direction": "up",
    "key": "commit",
    "tags": "Basic Snapshotting"},
  {"left": "index",
    "right": "local_repo",
    "direction": "up",
    "key": "commit --amend",
    "tags": "Basic Snapshotting"},
  {"left": "local_repo",
    "right": "local_repo",
    "direction": "status",
    "key": "log",
    "tags": "Branching and Merging, Inspection and Comparison"},
  {"left": "local_repo",
    "right": "local_repo",
    "direction": "status",
    "key": "diff x x",
    "tags": "Basic Snapshotting, Inspection and Comparison,Patching"},
  {"left": "local_repo",
    "right": "local_repo",
    "direction": "status",
    "key": "branch",
    "tags": "Branching and Merging"},
  {"left": "local_repo",
    "right": "local_repo",
    "direction": "status",
    "key": "branch -d x",
    "tags": "Branching and Merging"},
  {"left": "local_repo",
    "right": "remote_repo",
    "direction": "dn",
    "key": "branch --track x x",
    "tags": "Branching and Merging"},
  {"left": "workspace",
    "right": "remote_repo",
    "direction": "dn",
    "key": "clone x",
    "tags": "Creating Projects"},
  {"left": "workspace",
    "right": "remote_repo",
    "direction": "dn",
    "key": "pull x x",
    "tags": "Sharing and Updating"},
  {"left": "workspace",
    "right": "remote_repo",
    "direction": "dn",
    "key": "reset --hard x/x",
    "tags": "Basic Snapshotting"},
  {"left": "local_repo",
    "right": "remote_repo",
    "direction": "dn",
    "key": "fetch x x",
    "tags": "Sharing and Updating"},
  {"left": "local_repo",
    "right": "remote_repo",
    "direction": "up",
    "key": "push",
    "tags": "Sharing and Updating"},
  {"left": "local_repo",
    "right": "remote_repo",
    "direction": "up",
    "key": "push x x",
    "tags": "Sharing and Updating"},
  {"left": "local_repo",
    "right": "remote_repo",
    "direction": "up",
    "key": "push x x:x",
    "tags": "Sharing and Updating"},
  {"left": "remote_repo",
    "right": "remote_repo",
    "direction": "status",
    "key": "branch -r",
    "tags": "Branching and Merging"},
  {"left": "remote_repo",
    "right": "remote_repo",
    "direction": "status",
    "key": "push x :x",
    "tags": "Sharing and Updating"},
  {"left": "workspace",
    "right": "workspace",
    "direction": "dn",
    "key": "clean",
    "tags": "Administration"},
  {"left": "stash",
    "right": "workspace",
    "direction": "dn",
    "key": "stash save",
    "tags": "Branching and Merging"},
  {"left": "stash",
    "right": "workspace",
    "direction": "up",
    "key": "stash apply",
    "tags": "Branching and Merging"},
  {"left": "stash",
    "right": "workspace",
    "direction": "up",
    "key": "stash pop",
    "tags": "Branching and Merging"},
  {"left": "stash",
    "right": "stash",
    "direction": "status",
    "key": "stash list",
    "tags": "Branching and Merging"},
  {"left": "stash",
    "right": "stash",
    "direction": "status",
    "key": "stash show",
    "tags": "Branching and Merging"},
  {"left": "stash",
    "right": "stash",
    "direction": "status",
    "key": "stash drop",
    "tags": "Branching and Merging"},
  {"left": "stash",
    "right": "stash",
    "direction": "status",
    "key": "stash clear",
    "tags": "Branching and Merging"},
  {"left": "stash",
    "right": "local_repo",
    "direction": "up",
    "key": "stash branch x",
    "tags": "Branching and Merging"}
];

var translations = {
  en: {
    locations: {
      stash: 'stash',
      workspace: 'workspace',
      index: 'index',
      local_repo: 'local repository',
      remote_repo: 'upstream repository',
      docs: {
        stash: 'A place to hide modifications while you work on something else',
        workspace: 'Local checkout',
        index: 'Files you want to commit. Before you “commit” (checkin) files, you need to first add them to the index. Also called "current directory cache", "staging area", "cache" or "staged files".',
        local_repo: 'A subdirectory named `.git` that contains all of your necessary repository files — a Git repository skeleton. Typical branches: `master`, `feature-x`, `bugfix-y`',
        remote_repo: 'Versions of your project that are hosted on the Internet or network, ensuring all your changes are available for other developers. The default name is `origin`. Typical branches here: `master`, `shared-feature-x`, `release-y`'
      }
    },


    commands: {
      "status": {
        "cmd": "status",
        "docs": "Displays: \r• paths that have differences between the index file and the current `HEAD` commit, \r• paths that have differences between the workspace and the index file, and \r• paths in the workspace that are not tracked by git."
      },
      "diff": {"cmd": "diff", "docs": "Displays the differences not added to the index."},
      "diff x": {
        "cmd": "diff <commit or branch>",
        "docs": "View the changes you have in your workspace relative to the named <commit>. You can use `HEAD` to compare it with the latest commit, or a branch name to compare with the tip of a different branch"
      },
      "add x": {
        "cmd": "add <file... or dir...>",
        "docs": "Adds the current content of new or modified files to the index, thus staging that content for inclusion in the next commit. Use `add --interactive` to add the modified contents in the workspace interactively to the index."
      },
      "add -u": {
        "cmd": "add -u",
        "docs": "Adds the current content of modified (NOT NEW) files to the index.  This is similar to what `git commit -a` does in preparation for making a commit."
      },
      "rm x": {"cmd": "rm <file(s)...>", "docs": "Remove a file from the workspace and the index."},
      "mv x": {"cmd": "mv <file(s)...>", "docs": "Move file in the workspace and the index."},
      "commit -a": {
        "cmd": "commit -a [-m 'msg']",
        "docs": "Commit all files changed since your last commit, except untracked files (ie. all files that are already listed in the index). Remove files in the index that have been removed from the workspace."
      },
      "checkout x": {
        "cmd": "checkout <files(s)... or dir>",
        "docs": "Updates the file or directory in the workspace. Does NOT switch branches."
      },
      "reset head x": {
        "cmd": "reset HEAD <file(s)...>",
        "docs": "Remove the specified files from the next commit. Resets the index but not the working tree (i.e., the changed files are preserved but not marked for commit) and reports what has not been updated."
      },
      "reset --soft head^": {
        "cmd": "reset --soft HEAD^",
        "docs": "Undo the last commit, leaving changes in the index."
      },
      "reset --hard": {
        "cmd": "reset --hard",
        "docs": "Matches the workspace and index to the local tree. WARNING: Any changes to tracked files in the working tree since commit are lost. Use this if merging has resulted in conflicts and you'd like to start over. Pass `ORIG_HEAD` to undo the most recent successful merge and any changes after."
      },
      "checkout b": {
        "cmd": "checkout <branch>",
        "docs": "Switches branches by updating the index and workspace to reflect the specified branch, <branch>, and updating `HEAD` to be <branch>."
      },
      "checkout -b x": {"cmd": "checkout -b <name of new branch>", "docs": "Create a branch and switch to it"},
      "merge x": {
        "cmd": "merge <commit or branch>",
        "docs": "Merge changes from <branch name> into current branch.\rUse `&#8209;&#8209;no-commit` to leave" +
        " changes uncommitted. Use `--no-ff` to create a merge commit even if the merge resolves as a fast forward."
      },
      "rebase x": {
        "cmd": "rebase <upstream>",
        "docs": "Reverts all commits since the current branch diverged from <upstream>, and then re-applies them one-by-one on top of changes from the `HEAD` of <upstream>."
      },
      "cherry-pick x": {
        "cmd": "cherry-pick <commit>",
        "docs": "Integrate changes in the given commit into the current branch."
      },
      "revert x": {
        "cmd": "revert <commit>",
        "docs": "Reverse commit specified by <commit> and commit the result. This requires your working tree to be clean (no modifications from the `HEAD` commit)."
      },
      "diff --cached": {
        "cmd": "diff --cached [<commit>]",
        "docs": "View the changes you staged vs the latest commit. Can pass a <commit> to see changes relative to it."
      },
      "commit": {
        "cmd": "commit [-m 'msg']",
        "docs": "Stores the current contents of the index in a new commit along with a log message from the user describing the changes."
      },
      "commit --amend": {"cmd": "commit --amend", "docs": "Modify the last commit with the current index changes."},
      "log": {
        "cmd": "log",
        "docs": "Show recent commits, most recent on top. Options:\r`&#8209;&#8209;decorate` with branch and tag names on appropriate commits\r`&#8209;&#8209;stat` with stats (files changed, insertions, and deletions) \r`&#8209;&#8209;author=<author>`  only by a certain author\r`&#8209;&#8209;after=\"MMM DD YYYY\"` ex. (`Jun 20 2008`) only commits after a certain date\r`&#8209;&#8209;before=\"MMM DD YYYY\"` only commits that occur before a certain date \r`&#8209;&#8209;merge` only the commits involved in the current merge conflicts"
      },
      "diff x x": {"cmd": "diff <commit> <commit>", "docs": "View the changes between two arbitrary commits"},
      "branch": {
        "cmd": "branch",
        "docs": "List all existing branches. Option `-r` causes the remote-tracking branches to be listed, and option `-a` shows both."
      },
      "branch -d x": {"cmd": "branch -d <branch>", "docs": "Delete an specified branch. Use `-D` to force."},
      "branch --track x x": {
        "cmd": "branch --track <new> <remote/branch>",
        "docs": "Create a new local branch that tracks a remote branch."
      },
      "clone x": {
        "cmd": "clone <repo>",
        "docs": "Download the repository specified by <repo> and checkout `HEAD` of the master branch."
      },
      "pull x x": {
        "cmd": "pull <remote> <refspec>",
        "docs": "Incorporates changes from a remote repository into the current branch. In its default mode, `git pull` is shorthand for `git fetch` followed by `git merge FETCH_HEAD`."
      },
      "reset --hard x/x": {
        "cmd": "reset --hard <remote>/<branch>",
        "docs": "Reset local repo and working tree to match a remote branch. Use `reset &#8209;&#8209;hard origin/master` to throw away all commits to the local master branch. Use this to start over on a failed merge."
      },
      "fetch x x": {"cmd": "fetch <remote> <refspec>", "docs": "Download objects and refs from another repository."},
      "push": {
        "cmd": "push",
        "docs": "Update the server with your commits across all branches that are *COMMON* between your local copy and the server. Local branches that were never pushed to the server in the first place are not shared."
      },
      "push x x": {"cmd": "push <remote> <branch>", "docs": "Push new (or existing) branch to remote repository"},
      "push x x:x": {
        "cmd": "push <remote> <branch>:<branch>",
        "docs": "Push new branch to remote repository with a different name"
      },
      "branch -r": {"cmd": "branch -r", "docs": "List remote branches"},
      "push x :x": {
        "cmd": "push <remote> :<branch>",
        "docs": "Remove a remote branch. Literally \"push nothing to this branch\"."
      },
      "clean": {
        "cmd": "clean",
        "docs": "Cleans the working tree by recursively removing files that are not under version control, starting from the current directory. Use `-n` for a \"dry run\" to see what would be deleted. Use `-f` to delete the files."
      },
      "stash save": {
        "cmd": "stash save [<msg>]",
        "docs": "Save your local modifications to a new stash, and run `git reset &#8209;&#8209;hard` to revert them. The <msg> part is optional and gives the description along with the stashed state. For quickly making a snapshot, you can omit both `save` and <msg>."
      },
      "stash apply": {
        "cmd": "stash apply [<stash>]",
        "docs": "Move changes from the specified stash into the workspace. The latest stash is the default."
      },
      "stash pop": {
        "cmd": "stash pop",
        "docs": "Applies the changes from the last (or specified) stash and then removes the given stash."
      },
      "stash list": {"cmd": "stash list", "docs": "List the stashes that you currently have."},
      "stash show": {
        "cmd": "stash show [<stash>]",
        "docs": "Show the changes recorded in the stash as a diff between the stashed state and its original parent. When no <stash> is given, shows the latest one."
      },
      "stash drop": {
        "cmd": "stash drop [<stash>]",
        "docs": "Remove a single stashed state from the stash list. When no <stash> is given, it removes the latest one."
      },
      "stash clear": {
        "cmd": "stash clear",
        "docs": "Remove all the stashed states. Note that those states will then be subject to pruning, and may be impossible to recover."
      },
      "stash branch x": {
        "cmd": "stash branch <branchname> [<stash>]",
        "docs": "Creates and checks out a new branch named <branchname> starting from the commit at which the <stash> was originally created, applies the changes recorded in <stash> to the new working tree and index. \rIf that succeeds, and <stash> is a reference of the form stash@{<revision>}, it then drops the <stash>. When no <stash> is given, applies the latest one. \rThis is useful if the branch on which you ran `git stash save` has changed enough that `git stash apply` fails due to conflicts. Since the stash is applied on top of the commit that was `HEAD` at the time `git stash` was run, it restores the originally stashed state with no conflicts."
      }
    }
  },


  fr: {
    locations: {
      stash: 'REMISE',
      workspace: 'ESPACE DE TRAVAIL',
      index: 'INDEX',
      local_repo: 'DÉPÔT LOCAL',
      remote_repo: 'DÉPÔT DISTANT',
      docs: {
        stash: 'Un endroit où remiser des modifications pendant que vous travaillez sur autre chose',
        workspace: 'L\'espace de travail local',
        index: 'L\'index (ou "zone de transit") maintient un instantané de l\'espace de travail qui servira de base pour le prochain commit.',
        local_repo: 'Un sous-répertoire nommé .git qui contient tous les fichiers nécessaires au référentiel. Branches typiques : `master`, `fonction-x`, `correctif-y`',
        remote_repo: 'Versions de votre projet qui sont hébergés sur le réseau ou Internet, pour mettre toutes vos modifications à la disposition d\'autres développeurs. Par défaut «origin». Branches typiques : `master`, `fonction-x-partagée`, `version-y`'
      }
    },

    "commands": {
      "status": {"cmd": "status", "docs": "Affiche les chemins des fichiers qui diffèrent entre l'INDEX et la TÊTE du commit courant, ceux des fichiers qui diffèrent entre l'ESPACE_DE_TRAVAIL et l'INDEX, et ceux des fichiers qui sont dans l'ESPACE_DE_TRAVAIL mais ne sont pas encore suivis par git."},
      "diff": {"cmd": "diff", "docs": "Affiche les différences entre l'ESPACE_DE_TRAVAIL et l'INDEX."},
      "diff x": {"cmd": "diff <commit ou branche>", "docs": "Affiche les différences entre l'ESPACE_DE_TRAVAIL et le COMMIT ou la BRANCHE spécifié. Vous pouvez utiliser TÊTE pour comparer avec le dernier commit."},
      "add x": {"cmd": "add <fichier(s) ou dossier(s)>", "docs": "Ajoute à l'INDEX le contenu des FICHIER(S) ou DOSSIER(S), nouveaux ou modifiés, les plaçant ainsi en attente d'inclusion dans le prochain commit. Utilisez 'git add --interactive' pour ajouter de manière interactive à l'INDEX les contenus modifiés dans l'ESPACE_DE_TRAVAIL."},
      "add -u": {"cmd": "add -u", "docs": "Ajoute à l'INDEX le contenu des fichiers (ÉXISTANTS) modifiés. C'est ce que fait 'git commit -a' en préparation à un commit."},
      "rm x": {"cmd": "rm <fichier(s)>", "docs": "Supprime des FICHIER(S) de l'ESPACE_DE_TRAVAIL et de l'INDEX."},
      "mv x": {"cmd": "mv <fichier(s)>", "docs": "Déplace des FICHIER(S) de l'ESPACE_DE_TRAVAIL et de l'INDEX."},
      "commit -a": {"cmd": "commit -a [-m 'message']", "docs": "Fait un commit de tous les fichiers qui ont changé depuis le dernier commit, à l'exception des fichiers non suivis (ie. tous les fichiers qui sont dans l'INDEX). Supprime de l'INDEX les fichiers qui ont été supprimés de l'ESPACE_DE_TRAVAIL."},
      "checkout x": {
        "cmd": "checkout <fichier(s) ou dossier(s)>",
        "docs": "Met à jour les FICHIER(S) ou DOSSIER(S) dans l'ESPACE_DE_TRAVAIL en écrasant toutes les modifications locales. Ne PAS changer de branches."
      },
      "checkout b": {"cmd": "checkout <branche>", "docs": "Échange les branches en mettant à jour l'ESPACE_DE_TRAVAIL et l'INDEX pour charger la BRANCHE spécifiée en positionnant la TÊTE dessus."},
      "reset head x": {"cmd": "reset HEAD <fichier(s)>", "docs": "Supprime les FICHIER(S) spécifiés du prochain commit. Réinitialise l'INDEX mais pas l'ESPACE_DE_TRAVAIL (i.e. les fichiers modifiés sont préservés mais non marqués pour commit) et indique ce qui n'a pas été mis à jour."},
      "reset --soft head^": {"cmd": "reset --soft HEAD^", "docs": "Défait le dernier commit en laissant les modifications dans l'INDEX."},
      "reset --hard": {"cmd": "reset --hard", "docs": "Fait correspondre l'ESPACE_DE_TRAVAIL et l'INDEX avec le DÉPÔT_LOCAL. ATTENTION : toutes les modifications apportées à des fichiers suivis dans l'ESPACE_DE_TRAVAIL depuis le dernier commit sont perdues. Utilisez ceci lorsqu'une fusion a engendré des conflits et que vous souhaitez recommencer. Précisez `ORIG_HEAD` pour défaire la dernière fusion réussie et les modifications qui ont suivi."},
      "checkout -b x": {"cmd": "checkout -b <branche>", "docs": "Crée une nouvelle BRANCHE et se positionne dessus."},
      "merge x": {"cmd": "merge <commit ou branche>", "docs": "Fusionne les modifications du COMMIT ou de la BRANCHE dans la branche courante. Utilisez --no-commit pour ignorer les modifications n'ayant pas encore fait l'objet d'un commit."},
      "rebase x": {"cmd": "rebase <source>", "docs": "Défait tous les commits effectués depuis que la branche à divergé de SOURCE puis les refait tous un par un sur les modifications apportées à la TÊTE de SOURCE."},
      "cherry-pick x": {"cmd": "cherry-pick <commit>", "docs": "Intègre les modifications du COMMIT spécifié dans la branche courante."},
      "revert x": {"cmd": "revert <commit>", "docs": "Défait le COMMIT spécifié puis fait un commit du résultat. Cela nécessite que l'ESPACE_DE_TRAVAIL soit propre (sans modifications sur la TÊTE du commit)."},
      "diff --cached": {"cmd": "diff --cached [COMMIT]", "docs": "Montre les modifications que vous avez placé dans la REMISE par rapport au dernier commit. Vous pouvez préciser un COMMIT pour voir juste les modifications le concernant."},
      "commit": {"cmd": "commit [-m 'message']", "docs": "Enregistre le contenu de l'INDEX dans un nouveau commit en y associant un message utilisateur décrivant les modifications."},
      "commit --amend": {"cmd": "commit --amend", "docs": "Modifie le dernier commit en y apportant les modifications se trouvant dans l'INDEX."},
      "log": {"cmd": "log", "docs": "Montre les commits récents, les plus récents au début. Options : --decorate avec les noms de branches et d'étiquettes sur les commits, --stat avec des statistiques (fichiers modifiés, insertions et suppressions), --author=AUTEUR seuleument d'un certain AUTEUR, --after=\"MMM JJ AAAA\" ex. (\"Jun 20 2008\") limité aux commits faits après une certaine date, --before=\"MMM JJ AAAA\" limité aux commits faits avant une certaine date, --merge limité aux commits concernés par les conflits de fusion courants."},
      "diff x x": {"cmd": "diff <COMMIT_1> <COMMIT_2>", "docs": "Montre les modifications entre deux commits."},
      "branch": {"cmd": "branch", "docs": "Liste les branches locales existantes. L'option -r permet de lister les branches distantes et l'option -a montre les branches locales et distantes."},
      "branch -d x": {"cmd": "branch -d <branche>", "docs": "Supprime la BRANCHE spécifiée. Utilisez -D pour forcer la suppression."},
      "branch --track x x": {"cmd": "branch --track <branche> <branche_distante>", "docs": "Crée une BRANCHE locale qui suit la branche_distante."},
      "clone x": {"cmd": "clone <dépôt_distant>", "docs": "Télécharge le DÉPÔT_DISTANT et se positionne sur la TÊTE de sa branche master."},
      "pull x x": {"cmd": "pull <dépôt_distant> <référence>", "docs": "Récupère les modifications associées à la référence du DÉPÔT_DISTANT et les fusionne dans la branche courante."},
      "reset --hard x/x": {"cmd": "reset --hard <dépôt_distant> <branche>", "docs": "Réinitialise l'ESPACE_DE_TRAVAIL et le DÉPÔT_LOCAL pour les faire correspondre à la BRANCHE du DÉPÔT_DISTANT. Utilisez 'git reset --hard origin/master' pour rejeter tous les commits du DÉPÔT_LOCAL. Utilisez ceci pour reprendre après une fusion qui a échoué."},
      "fetch x x": {"cmd": "fetch <dépôt_distant> <référence>", "docs": "Télécharge les objets et les références associés à la référence du DÉPÔT_DISTANT."},
      "push": {"cmd": "push", "docs": "Met à jour le serveur en appliquant les commits sur toutes les branches *COMMUNNES* au DÉPÔT_LOCAL et au serveur. Les branches locales qui n'ont jamais été poussées sur le serveur ne sont pas partagées."},
      "push x x": {"cmd": "push <dépôt_distant> <branche>", "docs": "Pousse la BRANCHE spécifiée vers le DÉPÔT_DISTANT."},
      "push x x:x": {"cmd": "push <dépôt_distant> <BRANCHE_1>:<BRANCHE_2>", "docs": "Pousse la nouvelle BRANCHE_1 vers le DÉPÔT_DISTANT en la renommant BRANCHE_2."},
      "branch -r": {"cmd": "branch -r", "docs": "Liste les branches distantes."},
      "push x :x": {"cmd": "push <dépôt_distant> :<branche>", "docs": "Supprime la BRANCHE du DÉPÔT_DISTANT."},
      "clean": {"cmd": "clean", "docs": "Nettoie l'ESPACE_DE_TRAVAIL en supprimant récursivement les fichiers qui ne sont pas sous le contrôle de version, en commençant par le répertoire courant."},
      "stash save": {"cmd": "stash save ['message']", "docs": "Enregistre les modifications locales dans la REMISE puis fait un 'git reset --hard' pour les défaire. Le `message` optionnel donne la description associée à l'état enregistré dans la REMISE. Pour faire un instantanné rapide, vous pouvez omettre à la fois \"save\" et le `message`."},
      "stash apply": {"cmd": "stash apply [état]", "docs": "Déplace les modifications associées à l'ÉTAT de la REMISE vers l'ESPACE_DE_TRAVAIL. La dernière REMISE est prise par défaut."},
      "stash pop": {"cmd": "stash pop", "docs": "Applique les modifications du dernier état de la REMISE puis les supprime de la REMISE."},
      "stash list": {"cmd": "stash list", "docs": "Liste les états dans la REMISE."},
      "stash show": {"cmd": "stash show [état]", "docs": "Montre les modifications associées à l'ÉTAT spécifié sous la forme d'un diff entre l'ÉTAT et son parent initial. Lorsqu'aucun ÉTAT n'est précisé, le dernier est montré."},
      "stash drop": {"cmd": "stash drop [état]", "docs": "Supprime l'ÉTAT de la REMISE. Lorsqu'aucun ÉTAT n'est précisé, le dernier est supprimé."},
      "stash clear": {"cmd": "stash clear", "docs": "Supprime tous les états de la REMISE. Notez que ces états seront alors candidats à l'élagage et pourront être impossible à restaurer."},
      "stash branch x": {"cmd": "stash branch <branche> [état]", "docs": "Crée et charge une nouvelle BRANCHE à partir du commit d'où provient l'ÉTAT puis applique les modifications enregistrées dans l'ÉTAT aux nouveaux ESPACE_DE_TRAVAIL et INDEX. Si cela réussit, l'ÉTAT devient une référence de la forme ÉTAT@{RÉVISION} et l'ÉTAT est supprimé. Lorsqu'aucun ÉTAT n'est donné, le dernier est appliqué. Ceci est utile si une branche sur laquelle vous avez fait un 'stash' a suffisemment changée pour que 'stash apply' échoue à cause de conflits. Puisque l'état est apliqué sur le commit qui était en TÊTE au moment où le 'stash' a été effectué, l'état original est restauré sans conflits."
      }
    }
  },
  'zh-cn': {
    locations: {
      stash: '存档库',
      workspace: '工作区',
      index: '暂存区(索引)',
      local_repo: '本地版本库',
      remote_repo: '上游版本库',
      docs: {
        stash: '当你去修改别的东西的时候，隐藏（临时保存）当前的修改',
        workspace: '本地检出',
        index: '索引（暂存区）保存了一份工作(树)的快照,作为下次提交的内容',
        local_repo: '.git 文件夹保存版本库需要的全部信息(Git 版本库的骨架)，一般包括分支<strong>master</strong>, <strong>feature-x</strong>, <strong>bugfix-y</strong>',
        remote_repo: '在网络（局域或因特网）上共享给其他开发者的版本库，一般叫"origin". 一般包括分支<strong>master</strong>, <strong>shared-feature-x</strong>, <strong>release-y</strong>'
      }
    },


    commands: {
      "status": {"cmd": "status", "docs": "显示状态变化，包括1)暂存区与当前的 HEAD 提交之间(即将提交的)，2）工作区与暂存区(下次不会提交)，3）未曾被git追踪 (没有历史记录) "},
      "diff": {"cmd": "diff", "docs": "显示未添加到暂存区的不同"},
      "diff x": {"cmd": "diff <commit or branch>", "docs": "查看工作区与某一提交之间的不同。你也可以使用 HEAD 来对比上一提交，或是用分支名来和分支比较"},
      "add x": {"cmd": "add <file... or dir...>", "docs": "添加当前的新内容或是修改的文件到暂存区，作为下次提交的(部分)内容。用`add --interactive` 来交互式操作"},
      "add -u": {"cmd": "add -u", "docs": "添加当前修改(<strong>不包括新文件</strong>)到暂存区, 这与'git commit -a'准备提交内容的方式一致"},
      "rm x": {"cmd": "rm <file(s)...>", "docs": "从工作区和暂存区删除某个文件"},
      "mv x": {"cmd": "mv <file(s)...>", "docs": "从工作区和暂存区移动文件"},
      "commit -a": {"cmd": "commit -a [-m 'msg']", "docs": "提交上次提交之后的所有修改，1)未追踪的除外(即：所有暂存区有记录的文件)；2)从暂存区删除已在工作区删除的文件"},
      "checkout x": {"cmd": "checkout <files(s)... or dir>", "docs": "更新工作区文件或文件夹，<strong>不会</strong>切换分支"},
      "reset head x": {"cmd": "reset HEAD <file(s)...>", "docs": "从下次提交中移除指定文件。重置暂存区记录但是不处理工作区(即: 文件改动被保留但不会被提交)，同时报告没有被更新的文件"},
      "reset --soft head^": {"cmd": "reset --soft HEAD^", "docs": "恢复上一次提交，保留暂存区的改动"},
      "reset --hard": {"cmd": "reset --hard", "docs": "恢复工作区和暂存区到上次提交的状态，警告： 所有工作区修改都会被丢弃。使用这条命令来解决合并错误，如果你想从头开始的话传入 ORIG_HEAD 来撤销该次提交以来的所有改动"},
      "checkout b": {"cmd": "checkout <branch>", "docs": "切换分支，更改工作区和暂存区为<branch>分支的内容，之后HEAD指向<branch>分支"},
      "checkout -b x": {"cmd": "checkout -b <name of new branch>", "docs": "新建一个分支并且立即切换过去"},
      "merge x": {"cmd": "merge <commit or branch>", "docs": "从<branch name>分支合并到当前分支，使用`&#8209;&#8209;no-commit`可以保持在(已经合并)但未提交状态"},
      "rebase x": {"cmd": "rebase <upstream>", "docs": "衍合：回滚从【当前提交和<upstream>分支分开处】开始直到当前提交的所有提交，将这些提交一一应用到<upstream>分支，结果作为<upstream>的新提交Reverts all commits since the current branch diverged from <upstream>, and then re-applies them one-by-one on top of changes from the HEAD of <upstream>."},
      "cherry-pick x": {"cmd": "cherry-pick <commit>", "docs": "把某个提交移动到当前分支来"},
      "revert x": {"cmd": "revert <commit>", "docs": "回滚<commit>指定的提交，这需要当前工作区是干净的，即相比于 HEAD 提交没有修改"},
      "diff --cached": {"cmd": "diff --cached [<commit>]", "docs": "查看已经暂存的内容和上次提交的区别，也可指定某一提交"},
      "commit": {"cmd": "commit [-m 'msg']", "docs": "暂存区中的当前内容连同提交信息储存为新提交"},
      "commit --amend": {"cmd": "commit --amend", "docs": "用当前暂存去的内容修改最近一次的提交，也可以拿来修改提交信息"},
      "log": {"cmd": "log", "docs": "显示最近的提交，新的在上边。参数:\r`&#8209;&#8209;decorate` 显示分支和tag名字到对应的提交\r`&#8209;&#8209;stat` 显示状态 (文件修改, 添加, 删除) \r`&#8209;&#8209;author=<author>`  只显示某个作者\r`&#8209;&#8209;after=\"MMM DD YYYY\"` 如(\"Jun 20 2008\") 只显示某个日期之后的提交\r`&#8209;&#8209;before=\"MMM DD YYYY\"` 只显示某个日期之前的提交\r`&#8209;&#8209;merge` 只与当前合并冲突有关的提交"},
      "diff x x": {"cmd": "diff <commit> <commit>", "docs": "显示两个提交之间的不同"},
      "branch": {"cmd": "branch", "docs": "显示所有（本地）存在的分支。参数 -r 显示远程追踪分支，参数 -a 显示全部"},
      "branch -d x": {"cmd": "branch -d <branch>", "docs": "删除某个分支，使用—D来强制删除"},
      "branch --track x x": {"cmd": "branch --track <new> <remote/branch>", "docs": "添加一个本地分支来跟踪某个远程分支"},
      "clone x": {"cmd": "clone <repo>", "docs": "下载<repo>指定的版本库，并在工作区迁出master分支的HEAD版本"},
      "pull x x": {"cmd": "pull <remote> <refspec>", "docs": "从远程版本库取得修改到当前分支. 一般来说, `git pull` 相当于 `git fetch` 然后做 `git merge FETCH_HEAD`."},
      "reset --hard x/x": {"cmd": "reset --hard <remote>/<branch>", "docs": "重置本地版本库，让它与远程版本一致；用 `reset &#8209;&#8209;hard origin/master` 来丢弃所有的本地改动；用这个来处理失败的合并，直接从远程开始"},
      "fetch x x": {"cmd": "fetch <remote> <refspec>", "docs": "从远端版本库下载对象和引用(即版本信息)"},
      "push": {"cmd": "push", "docs": "从本地提交推送分支改变到远程，分支为所有推送过的分支"},
      "push x x": {"cmd": "push <remote> <branch>", "docs": "向远端版本库推送新的(已存在的)分支"},
      "push x x:x": {"cmd": "push <remote> <branch>:<branch>", "docs": "向远端版本库推送分支，但是从不同的（本地）分支名"},
      "branch -r": {"cmd": "branch -r", "docs": "显示远程端分支"},
      "push x :x": {"cmd": "push <remote> :<branch>", "docs": "删除一个远程分支，通过向远程分支推送空内容"},
      "clean": {"cmd": "clean", "docs": "从当前文件夹开始递归清理不受版本管理的内容"},
      "stash save": {"cmd": "stash save [<msg>]", "docs": "保存当前修改到新的存档库，并且执行`git reset &#8209;&#8209;hard`来回滚. <msg>是可选的来描述存档。想快速建立存档，省略掉\"save\"和<msg>."},
      "stash apply": {"cmd": "stash apply [<stash>]", "docs": "从某个存档中将改变应用到工作区，默认是最近的存档"},
      "stash pop": {"cmd": "stash pop", "docs": "应用最后一个（或指定的）存档中的改动，然后从存档库丢弃它"},
      "stash list": {"cmd": "stash list", "docs": "显示当前你有的所有存档"},
      "stash show": {"cmd": "stash show [<stash>]", "docs": "显示存档中记录的改动，对比存档生成时的原来状态；不指定<stash>则显示最后一个"},
      "stash drop": {"cmd": "stash drop [<stash>]", "docs": "从存储区中删除单个存档；不指定<stash>则删除最后一个"},
      "stash clear": {"cmd": "stash clear", "docs": "清空存档库。注意相关存档会被清理，此操作<strong>不能被恢复</strong>"},
      "stash branch x": {
        "cmd": "stash branch <branchname> [<stash>]",
        "docs": "新建并检出一个新分支<branchname>, 分支开始于存档建立时的源提交，应用存档的变化作为新的工作区和暂存区。如果成功并且<stash>是以 stash@{<revision>}方式给出的，则从存档库删除它。未给出则使用最后一个存档。这在当前分支运行 stash save 导致冲突时很好用，因为存档应用于它生成时的提交一定不会有冲突发生"
      }
    }
  },
  es: {
    locations: {
      stash: 'stash',
      workspace: 'workspace',
      index: 'index',
      local_repo: 'repositorio local',
      remote_repo: 'repositorio remoto',
      docs: {
        stash: 'Un lugar para ocultar cambios mientras trabajas en otra cosa',
        workspace: 'Espacio de trabajo: archivos locales posicionados en una rama',
        index: 'El index (o "staging area") contiene una captura del contenido del árbol de trabajo. Esta captura representa a los contenidos del próximo commit.',
        local_repo: 'Un subdirectorio llamado .git que contiene todos los archivos necesarios — un esqueleto del repositorio Git. Ramas típicas: `master`, `feature-x`, `bugfix-y`',
        remote_repo: 'Version(es) del proyecto que están alojadas en Internet o una red, asegurando que todos los cambios están disponibles para otros desarrolladores. Por defecto es "origin". Ramas típicas aquí son: `master`, `shared-feature-x`, `release-y`'
      }
    },


    commands: {
      "status": {"cmd": "status", "docs": "Muestra las localizaciones que tienen diferencias entre el index y el commit `HEAD` actual, localizaciones que tienen diferencias entre el workspace y el index, y localizaciones en el workspace que no están siendo registradas por git"},
      "diff": {"cmd": "diff", "docs": "Muestra las diferencias no añadidas al index."},
      "diff x": {"cmd": "diff <commit or branch>", "docs": "Muestra los cambios que existen en el workspace relativos al <commit> mencionado. Puede usarse `HEAD` para comparar contra el último commit, o el nombre de una rama (branch) para comparar contra otra rama"},
      "add x": {"cmd": "add <file... or dir...>", "docs": "Añade el contenido actual de archivos nuevos o modificados al index, preparando a la vez ese contenido para ser incluído en el próximo commit. Usar `add --interactive` para añadir los contenidos del espacio de trabajo al index de manera interactiva."},
      "add -u": {"cmd": "add -u", "docs": "Adds the current content of modified (NOT NEW) files to the index.  This is similar to what 'git commit -a' does in preparation for making a commit."},
      "add -u": {"cmd": "add -u", "docs": "Añade el contenido actual de los archivos modificados (NO NUEVOS) al index. Es similar a lo que hace 'git commit -a' al prepararse para realizar un commit."},
      "rm x": {"cmd": "rm <file(s)...>", "docs": "Elimina uno o varios archivos del espacio de trabajo e index."},
      "mv x": {"cmd": "mv <file(s)...>", "docs": "Mueve uno o varios archivos del espacio de trabajo e index."},
      "commit -a": {"cmd": "commit -a [-m 'msg']", "docs": "Realiza un commit con todos los cambios en los archivos desde el último commit, excluyendo los archivos no registrados (ej: todos los archivos que están listados en index). Elimina archivos en index que fueron eliminados del espacio de trabajo."},
      "checkout x": {"cmd": "checkout <files(s)... or dir>", "docs": "Actualiza el archivo o directorio en el espacio de trabajo. Esto NO cambia de rama."},
      "reset head x": {"cmd": "reset HEAD <file(s)...>", "docs": "Descarta los archivos especificados del próximo commit. Restablece el index pero no el árbol de trabajo (ej:, los cambios en archivos se mantienen pero no se preparan para commit) y reporta cuales no han sido actualizados."},
      "reset --soft head^": {"cmd": "reset --soft HEAD^", "docs": "Deshace el último commit, dejando los cambio en el index."},
      "reset --hard": {"cmd": "reset --hard", "docs": "Equipara el espacio de trabajo y el index al árbol local. ADVERTENCIA: Se pierden todos los cambios a archivos registrados por git desde el último commit. Usar este comando si una combinación/merge resultó en conflictos y es necesario comenzar de nuevo. Al pasar `ORIG_HEAD` puede deshacerse el merge más reciente y todos los cambios posteriores."},
      "checkout b": {"cmd": "checkout <branch>", "docs": "Cambia de rama actualizando el index y el espacio de trabajo para reflejar la rama especificada, <branch>, y actualizando la posición de `HEAD` a <branch>."},
      "checkout -b x": {"cmd": "checkout -b <name of new branch>", "docs": "Crea una rama y posiciona el `HEAD` allí"},
      "merge x": {"cmd": "merge <commit or branch>", "docs": "Combina (merge) los cambios de <branch name> con los de la rama actual.\rUsar `&#8209;&#8209;no-commit` para dejar los cambios sin realizar un commit."},
      "rebase x": {"cmd": "rebase <upstream>", "docs": "Revierte todos los commits desde que la rama actual se separó del <upstream>, y luego los vuelve a aplicar uno por uno por sobre los commits del `HEAD` de <upstream>."},
      "cherry-pick x": {"cmd": "cherry-pick <commit>", "docs": "Aplica los cambios del commit especificado en la rama actual."},
      "revert x": {"cmd": "revert <commit>", "docs": "Revierte el <commit> especificado y realiza un commit con el resultado. Esto requiere que el árbol de trabajo esté limpio (sin modificaciones desde el `HEAD` commit)"},
      "diff --cached": {"cmd": "diff --cached [<commit>]", "docs": "Visualiza los cambios que se han preparado vs el último commit. Se puede pasar un <commit> para ver los cambios relativos al mismo."},
      "commit": {"cmd": "commit [-m 'msg']", "docs": "Almacena el contenido actual del index en un nuevo commit acompañado de un mensaje de log que describe esos cambios."},
      "commit --amend": {"cmd": "commit --amend", "docs": "Modifica el último commit con los cambios actuales."},
      "log": {"cmd": "log", "docs": "Muestra los commits recientes, comenzando por los últimos. Optiones:\r`&#8209;&#8209;decorate` para incluir nombres de ramas y tags\r`&#8209;&#8209;stat` para incluir métricas (archivos modificados, insertados, and eliminados) \r`&#8209;&#8209;author=<author>`  para filtrar por autor\r`&#8209;&#8209;after=\"MMM DD YYYY\"` ej. (\"Jun 20 2008\") para incluir commits desde esa fecha\r`&#8209;&#8209;before=\"MMM DD YYYY\"` incluye commits anteriores a esa fecha \r`&#8209;&#8209;merge` incluye únicamente los commits involucrados en conflictos de combinación"},
      "diff x x": {"cmd": "diff <commit> <commit>", "docs": "Visualizar los cambios entre dos commits arbitrariamente"},
      "branch": {"cmd": "branch", "docs": "Lista todas las ramas existentes. Agregando -r lista las ramas registradas como remotas, la opción -a muestra ambas ramas."},
      "branch -d x": {"cmd": "branch -d <branch>", "docs": "Elimina la rama especificada. Usar -D para forzar esto."},
      "branch --track x x": {"cmd": "branch --track <new> <remote/branch>", "docs": "Crea una nueva rama local que sigue a una rama remota."},
      "clone x": {"cmd": "clone <repo>", "docs": "Descarga el repositorio especificado por <repo> y posiciona el `HEAD` en la rama master."},
      "pull x x": {"cmd": "pull <remote> <refspec>", "docs": "Incorpora los cambios desde un repositorio remoto en la rama actual. En su modo por defecto, `git pull` es un atajo de `git fetch` seguido por `git merge FETCH_HEAD`."},
      "reset --hard x/x": {"cmd": "reset --hard <remote>/<branch>", "docs": "Reset local repo and working tree to match a remote branch. Use `reset &#8209;&#8209;hard origin/master` to throw away all commits to the local master branch. Use this to start over on a failed merge."},
      "reset --hard x/x": {"cmd": "reset --hard <remote>/<branch>", "docs": "Equipara el espacio de trabajo y el index con una rama remota. Usar `reset &#8209;&#8209;hard origin/master` para descartar todos los commits en la rama local master. Se puede utilizar para comenzar de nuevo desde una combinación/merge fallida."},
      "fetch x x": {"cmd": "fetch <remote> <refspec>", "docs": "Descarga los objetos y referencias desde otro repositorio."},
      "push": {"cmd": "push", "docs": "Actualiza el servidor con los commits de todas ramas que tienen en *COMÚN* entre el repositorio local y el remoto. Las ramas locales que nunca fueron enviadas al server (push) no están compartidas."},
      "push x x": {"cmd": "push <remote> <branch>", "docs": "Envía una nueva (o existente) rama al repositorio remoto"},
      "push x x:x": {"cmd": "push <remote> <branch>:<branch>", "docs": "Envía una rama al repositorio remoto con otro nombre"},
      "branch -r": {"cmd": "branch -r", "docs": "Lista las ramas remotas"},
      "push x :x": {"cmd": "push <remote> :<branch>", "docs": "Elimina una rama remota. Literalmente &quot;envía nada a ese branch&quot; "},
      "clean": {"cmd": "clean", "docs": "Limpia el árbol de trabajo eliminando de forma recursiva los archivos que no están bajo el control de versionado, comenzando por el directorio actual"},
      "stash save": {"cmd": "stash save [<msg>]", "docs": "Guarda las modificaciones locales en un nuevo stash, y luego ejecuta git reset &#8209;&#8209;hard para revertirlas. El <msg> es optativo y agrega una descripción adicional al estado. Para realizar una captura rápida, se pueden omitir tanto \"save\" como <msg>."},
      "stash apply": {"cmd": "stash apply [<stash>]", "docs": "Aplica los cambios del stash especificado en el espacio de trabajo. Por defecto aplica el último stash."},
      "stash pop": {"cmd": "stash pop", "docs": "Aplica los cambios del stash especificado y luego lo elimina de los temporales. Por defecto aplica el último stash."},
      "stash list": {"cmd": "stash list", "docs": "Lista los stashes disponibles actualmente."},
      "stash show": {"cmd": "stash show [<stash>]", "docs": "Muestra los cambios almacenados en el stash aplicando un diff entre ese stash y su padre original. Por defecto utiliza el último stash."},
      "stash drop": {"cmd": "stash drop [<stash>]", "docs": "Remove a single stashed state from the stash list. When no <stash> is given, it removes the latest one."},
      "stash drop": {"cmd": "stash drop [<stash>]", "docs": "Elimina una entrada del listado de stash. Por defecto elimina el último stash."},
      "stash clear": {"cmd": "stash clear", "docs": "Elimina todos las entradas del stash. IMPORTANTE: estas entradas eliminadas pueden ser irrecuperables luego."},
      "stash branch x": {
        "cmd": "stash branch <branchname> [<stash>]",
        "docs": "Crea y posiciona `HEAD` en el <branchname> apuntando al commit del cual el <stash> fue creado originalmente, aplicando luego los cambios almacenados en el <stash> al nuevo árbol de trabajo. \rSi se realiza exitosamente, y <stash> es una referencia tipo stash@{<revision>}, el comando elimina el <stash>. Cuando no se especifica un <stash>, aplica el último. \rEste comando es útil en los casos en que la rama en la que se ejecutó git stash save ha cambiado demasiado por lo que git stash apply fallaría por conflictos. Al aplicar los cambios sobre el commit que fue `HEAD` al momento de ejecutar git stash originalmente, se restauran los cambios sin conflictos."
      }
    }
  },
  de: {
    locations: {
      stash: 'Stash',
      workspace: 'Arbeitskopie',
      index: 'Index',
      local_repo: 'Lokales Repository',
      remote_repo: 'Remote Repository',
      docs: {
        stash: 'Hier können Änderungen "geparkt" werden, während man an etwas anderem arbeitet',
        workspace: 'Checkout des lokalen Repositories',
        index: 'Zu commitende Dateien. Vor einem "commit" (checkin), müssen die Dateien zuerst zu dem Index hinzugefügt werden. Wird auch "staging area" order "staged files" genannt.',
        local_repo: 'Der lokale clone des Remote Repositories. Es wird in dem Verzeichnis `.git` verwaltet. Typische Branches sind: `master`, `feature-x`, `bugfix-y`',
        remote_repo: 'Der Ursprung des lokalen Repositories. Durch ein `clone` wird es automatisch als `origin` gesetzt.'
      }
    },

    commands: {
      "status": {
        "cmd": "status",
        "docs": "Zeigt: \r• Pfade mit Unterschieden zwischen dem Index und dem aktuellen `HEAD` commit \r• Pfade mit Unterschieden zwischen der Arbeitskopie und dem Index \r• Pfade in der Arbeitskopie, die nicht durch Git verwaltet werden"
      },
      "diff": {"cmd": "diff", "docs": "Zeigt die Änderungen, die noch nicht dem Index hinzugefügt wurden."},
      "diff x": {
        "cmd": "diff <Commit oder Branch>",
        "docs": "Zeigt die Änderungen in der Arbeitskopie im Vergleich zu dem <Commit>. `HEAD` kann als synonym für den letzten Commit im aktuellen Branch verwendet werden. Wird ein Branch-Name angegeben, wird mit dem letzten Commit auf diesem Branch verglichen"
      },
      "add x": {
        "cmd": "add <Datei(en) oder Verzeichnis(se)>",
        "docs": "Fügt neue oder geänderte Dateien oder Verzeichnisse dem Index hinzu."
      },
      "add -u": {
        "cmd": "add -u",
        "docs": "Fügt geänderte (NICHT NEUE) Dateien dem Index hinzu. Das ist ähnlich dem, was ein `git commit -a` vor dem Commit macht."
      },
      "rm x": {"cmd": "rm <Datei(en)...>", "docs": "Entfernt eine Datei aus der Arbeitskopie und dem Index."},
      "mv x": {"cmd": "mv <Datei(en)...>", "docs": "Verschiebt eine Datei in der Arbeitskopie und dem Index."},
      "commit -a": {
        "cmd": "commit -a [-m 'Nachricht']",
        "docs": "Fügt automatisch alle geänderten und gelöschte Dateien dem Index hinzu und committet diese dann. Neue Dateien bleiben unberücksichtigt."
      },
      "checkout x": {
        "cmd": "checkout <Datei(en)... oder Verzeichnis>",
        "docs": "Aktualisiert die Datei oder das Verzeichnis in der Arbeitskopie vom lokalen Repository. Arbeitet auf dem aktuellen Branch."
      },
      "reset head x": {
        "cmd": "reset HEAD <Datei(en)...>",
        "docs": "Entfernt die <Datei(en)> aus dem Index, in der Arbeitskopie bleibt die Änderung erhalten."
      },
      "reset --soft head^": {
        "cmd": "reset --soft HEAD^",
        "docs": "Setzt die Arbeitskopie auf den Stand des letzten Commits im lokalen Repository zurück. Der Inhalt im Index bleibt erhalten."
      },
      "reset --hard": {
        "cmd": "reset --hard",
        "docs": "Setzt die Arbeitskopie auf den Stand des letzten Commits im lokalen Repository zurück. WARNUNG: Alle nicht committeten Änderungen und neue Dateien der Arbeitskopie und des Index gehen verloren. Dieses Kommando ist nützlich, wenn ein Mergen fehlgeschlagen ist und man von vorne beginnen möchte. Mit dem Parameter `ORIG_HEAD` kann der letzte, erfolgreiche Merge und alle Änderungen danach rückgängig gemacht werden."
      },
      "checkout b": {
        "cmd": "checkout <Branch>",
        "docs": "Checkt den <Branch> in die Arbeitskopie aus. Änderungen bleiben erhalten, so dass sie in den Branch committet werden können."
      },
      "checkout -b x": {"cmd": "checkout -b <Name des neuen Branches>", "docs": "Erzeugt einen neuen Branch und wechselt zu diesem"},
      "merge x": {
        "cmd": "merge <Commit oder Branch>",
        "docs": "Mergt Änderungen aus <Branch> oder <Commit> in den aktuellen Branch.\rMit `&#8209;&#8209;no-commit` wird kein automatisches Commit durchgeführt. Mit `--no-ff` wird auch dann ein Merge-Commit erzeugt, wenn ein Fast-Forward Merge gemacht werden könnte."
      },
      "rebase x": {
        "cmd": "rebase <upstream>",
        "docs": "Alle lokalen Commits werden in einen temporären Bereich verschoben und nacheinander auf den HEAD vom <upstream> wieder aufgespielt. Wird genutzt, um eigene Änderungen mit dem letzten Stand des Remote Repositories ohne einen Merge Commit zusammenzuführen."
      },
      "cherry-pick x": {
        "cmd": "cherry-pick <Commit>",
        "docs": "Integriert Änderungen des <Commit>s in den aktuellen Branch."
      },
      "revert x": {
        "cmd": "revert <Commit>",
        "docs": "Erzeugt einen Commit, der die Änderungen in <Commit> rückgängig macht."
      },
      "diff --cached": {
        "cmd": "diff --cached [<Commit>]",
        "docs": "Vergleicht die Änderungen im Index mit dem letzten Commit. Wird ein <Commit> angegeben, wird der Index damit verglichen."
      },
      "commit": {
        "cmd": "commit [-m 'Nachricht']",
        "docs": "Erzeugt einen neuen Commit mit dem Inhalt des Index und der eingegebenen Nachricht."
      },
      "commit --amend": {"cmd": "commit --amend", "docs": "Fügt den Inhalt des Index dem letzten Commit hinzu. Kann auch genutzt werden, um Parameter des Commits zu ändern."},
      "log": {
        "cmd": "log",
        "docs": "Zeigt die Commit-Historie. Parameter: \r`&#8209;&#8209;decorate` zeigt Branch- und Tag-Namen\r`&#8209;&#8209;stat` zeigt die Anzahl der Veränderungen je Datei\r`&#8209;&#8209;author=<Autor>` zeigt nur Commits des <Author>s\r`&#8209;&#8209;after=\"MMM DD YYYY\"` z.B. (`Jun 20 2008`) zeigt nur Commits nach einem bestimmten Zeitpunkt\r`&#8209;&#8209;before=\"MMM DD YYYY\"` zeigt nur Commits vor einem bestimmten Datum\r`&#8209;&#8209;merge` zeigt nur Commits die an einem bestehenden Merge-Konflikt beteiligt sind"
      },
      "diff x x": {"cmd": "diff <Commit> <Commit>", "docs": "Zeigt die Unterschiede zwischen zwei Commits"},
      "branch": {
        "cmd": "branch",
        "docs": "Listet alle existierenden Branches auf. Mit `-r` werden die Remote-Tracking-Branches angezeigt und `-a` listet beide auf."
      },
      "branch -d x": {"cmd": "branch -d <Branch>", "docs": "Löscht den angegebenen <Branch>. `-D` erzwingt das Löschen."},
      "branch --track x x": {
        "cmd": "branch --track <new> <remote/branch>",
        "docs": "Erzeugt einen neuen lokalen Branch, der <remote/branch> als Remote-Tracking-Branch verwendet."
      },
      "clone x": {
        "cmd": "clone <Repository>",
        "docs": "Kopiert das <Repository> in ein neues Verzeichnis und checkt den master Branch aus. Der Remote-Tracking-Branch verweist auf das Quell-Repository."
      },
      "pull x x": {
        "cmd": "pull <remote> <refspec>",
        "docs": "Lädt die Änderungen des aktuellen Branches von seinem origin und überträgt sie in das lokale Repository und die Arbeitskopie. In der Standardkonfiguration ist `git pull` ein Abkürzung für `git fetch` gefolgt von `git merge FETCH_HEAD`."
      },
      "reset --hard x/x": {
        "cmd": "reset --hard <remote>/<branch>",
        "docs": "Setzt das lokale Repository und die Arbeitskopie auf den Stand des Remote Repositories. Zum Beispiel verwirft `reset &#8209;&#8209;hard origin/master` alle Änderungen am lokalen master-Branches."
      },
      "fetch x x": {"cmd": "fetch <remote> <refspec>", "docs": "Lädt die Änderungen des aktuellen Branches von seinem origin und überträgt sie in das lokale Repository. Die Arbeitskopie bleibt unverändert. Das ist nützlich, um den eigenen Stand mit dem Remote-Stand zu vergleichen."},
      "push": {
        "cmd": "push",
        "docs": "Überträgt die neuen Commits des lokalen Repositories für den aktuellen Branches in das Remote Repository. `--all` überträgt die Commits aller Branches."
      },
      "push x x": {"cmd": "push <remote> <branch>", "docs": "Überträgt einen neuen (oder existierenden) Branch in das Remote Repository"},
      "push x x:x": {
        "cmd": "push <remote> <branch>:<branch>",
        "docs": "Überträgt einen neuen Branch mit einem anderen Namen in das Remote Repository."
      },
      "branch -r": {"cmd": "branch -r", "docs": "Zeigt die Branches des Remote Repositories"},
      "push x :x": {
        "cmd": "push <remote> :<branch>",
        "docs": "Löscht den Branch im Remote Repository."
      },
      "clean": {
        "cmd": "clean",
        "docs": "Löscht (rekursiv, vom aktuellen Verzeichnis) alle Dateien der Arbeitskopie, die nicht unter Versionskontrolle stehen (die sich noch nicht im lokalen Repository oder im Index befinden). `-n` führt einen \"dry run\" durch und zeigt an, welche Dateien gelöscht werden würden. `-f` führt das Löschen aus."
      },
      "stash save": {
        "cmd": "stash save [<Nachricht>]",
        "docs": "Speichert aktuelle Änderungen der Arbeitskopie in einem neuen \"Stash\" und ruft `git reset &#8209;&#8209;hard` auf. Die <Nachricht> ist optional, wird keine <Nachricht> angegeben kann `save` auch weggelassen werden."
      },
      "stash apply": {
        "cmd": "stash apply [<Stash>]",
        "docs": "Fügt die Änderungen des angegebenen <Stash> in die Arbeitskopie ein. Wird <Stash> nicht angegeben, wird der zuletzt erstellte verwendet."
      },
      "stash pop": {
        "cmd": "stash pop",
        "docs": "Fügt die Änderungen des letzten Stash in die Arbeitskopie ein und entfernt den Stash."
      },
      "stash list": {"cmd": "stash list", "docs": "Zeigt alle vorhandenen Stashes an."},
      "stash show": {
        "cmd": "stash show [<Stash>]",
        "docs": "Zeigt die Änderungen des <Stash> im Vergleich zum ursprünglichen Zustand. Wenn kein <Stash> angegeben ist, wird der neueste verwendet."
      },
      "stash drop": {
        "cmd": "stash drop [<Stash>]",
        "docs": "Löscht einen vorhandenen \"Stash\". Wird kein <Stash> angegeben, wird der neueste gelöscht."
      },
      "stash clear": {
        "cmd": "stash clear",
        "docs": "Lösche alle vorhandenen \"Stashes\"."
      },
      "stash branch x": {
        "cmd": "stash branch <Branch> [<Stash>]",
        "docs": "Erzeugt einen neuen <Branch> und checkt diesen aus. Der Branch zweigt von dem Commit ab, auf dem der <Stash> basiert. Die Änderungen des Stashes werden dann in die Arbeitskopie des neuen Branches eingespielt.\rWenn das erfolgreich ist und der <Stash> eine Referenz in der Form stash@{<revision>} ist, dann wird der <Stash> entfernt. Wenn <Stash> nicht angegeben ist, wird der neueste verwendet.\rDas ist nützlich, wenn sich der Branch auf dem der Stash eingespielt werden soll, so stark verändert hat, dass `git stash apply` aufgrund von Konflikten fehlschlägt. Da der Stash mit diesem Kommando auf dem ursprünglichen Commit zum Zeitpunkt von `git stash` eingespielt wird, wird so der Originalzustand des Stashes ohne Konflikte wiederhergestellt."
      }
    }
  }
}
