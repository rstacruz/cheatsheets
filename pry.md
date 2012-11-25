title: Pry
--

### cd / ls

    > cd Array

    > ls
    Array.methods: [] try_convert
    Array#methods: & * + abbrev assoc at ...

    > ls         # All

    > ls -m      # Methods
    > ls -M      # Instance methods

    > ls -g      # Globals
    > ls -l      # Local vars
    > ls -c      # Constants

    > ls -i      # Instance vars

    > ls -G xx   # Grey by regex

### Shell integration

shell-mode adds dir to the prompt

    pry(main)> shell-mode
    pry(main):/home/x $

Commands with `.` are shell commands

   pry(main)> .cat hello.txt

### Inspection

   > show-method Array#select

   > ri Array#each
   > cd Gem
   > show-doc try_activate

Finding

   > find-method each
   Array#each
   Array#each_index
   Enumerable#each_slice
   ...

### Editing

   > edit-method Pry#repl

### Gems

   > gem-cd foo      # Switch to gem's dir
   > gem-install foo
   > gem-list

### Misc commands

   > hist          # History
   > wtf?          # Trace of recent exception

### Rails console

   $ pry -r ./config/environment

### Bonus: hirb

   > table User.all
   > view User.all
   > view User.all, fields: %w[id name email]

### Reference

 * [Pry](https://github.com/pry/pry)
 * [Hirb](https://github.com/cldwalker/hirb)
