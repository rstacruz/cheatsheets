desc "Build"
task :build do
  system "proton build"
end

desc "Deploy"
task :deploy => :build do
  system "git update-ghpages rstacruz/cheatsheets -i _output --force"
end
