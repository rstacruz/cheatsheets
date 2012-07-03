class Tweetx < Formula
  homepage 'http://code.google.com/p/tweetx/'
  url 'http://tweetx.googlecode.com/files/tweetx-0.1.tar.gz'
  version '0.1'
  sha1 'e676f895ac5df1574f6fd4086ee57b9bf8d71e20'

  head 'https://github.com/b4winckler/macvim.git', :branch => 'master'

  def options
  [
    ["--custom-icons", "Try to generate custom document icons."],
  ]
  end

  depends_on 'cscope' if ARGV.include? '--with-cscope'

  def install
    system "./configure",
      "--prefix=#{prefix}",
      "--libdir=#{lib}"
    system "make install"

    man1.install 'manpage.1'
    bin.install "foo"
  end
end
