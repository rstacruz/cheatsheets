---
title: Compression
category: CLI
layout: 2017/sheet
updated: 2017-10-31
---

### Compressing files

| Command/Syntax														| Description																																																																								| Examples																								|
| ---																	| ---																																																																										| --- 																									|
| `gzip {filename}`														| Gzip compress the size of the given files using Lempel-Ziv coding (LZ77). Whenever possible, each file is replaced by one with the extension .gz.																																							| `gzip mydata.doc`<br/>`gzip *.jpg`																	|
| `bzip2 {filename}`													| bzip2 compresses files using the Burrows-Wheeler block sorting text compression algorithm, and Huffman coding. Compression is generally considerably better than that achieved by bzip command (LZ77/LZ78-based compressors). Whenever possible, each file is replaced by one with the extension .bz2.	| `bzip2 mydata.doc`<br/>`bzip2 *.jpg`																	|
| `zip {.zip-filename} {filename-to-compress}`							| zip is a compression and file packaging utility for Unix/Linux. Each file is stored in single .zip {.zip-filename} file with the extension .zip.																																							| `zip mydata.zip mydata.doc`<br/>`zip data.zip *.doc`													|
| `tar -zcvf {.tgz-file} {files}`<br/>`tar -jcvf {.tbz2-file} {files}`	| The GNU tar is archiving utility but it can be use to compressing large file(s). GNU tar supports both archive compressing through gzip and bzip2. If you have more than 2 files then it is recommended to use tar instead of gzip or bzip2.<br/>-z: use gzip compress<br/>-j: use bzip2 compress			| `tar -zcvf data.tgz *.doc`<br/>`tar -zcvf pics.tar.gz *.jpg *.png`<br/>`tar -jcvf data.tbz2 *.doc`	|

### Decompressing files

| Command/Syntax										| Description																											| Examples																			|
| ---													| ---																													| --- 																				|
| `gzip -d {.gz file}`<br/>`gunzip {.gz file}`			| Decompressed a file that is created using gzip command. File is restored to their original form using this command.	| `gzip -d mydata.doc.gz`<br/>`gunzip mydata.doc.gz`								|
| `bzip2 -d {.bz2-file}`<br/>`bunzip2 {.bz2-file}`		| Decompressed a file that is created using bzip2 command. File is restored to their original form using this command.	| `unzip file.zip`<br/>`unzip data.zip resume.doc`									|
| `unzip {.zip file}`									| Extract compressed files in a ZIP archive.																			| `bzip2 -d mydata.doc.gz`<br/>`bunzip2 mydata.doc.gz`								|
| `tar -zxvf {.tgz-file}`<br/>`tar -jxvf {.tbz2-file}`	| Untar or decompressed a file(s) that is created using tar compressing throughgzip and bzip2 filter.					| `tar -zxvf data.tgz`<br/>`tar -zxvf pics.tar.gz *.jpg`<br/>`tar -jxvf data.tbz2`	|

### Listing the contents of an archive

| Command/Syntax								| Description										| Examples											|
| ---											| ---												| ---												|
| `gzip -l {.gz file}`							| Display all processes status						| `gzip -l mydata.doc.gz`							|
| `unzip -l {.zip file}`						| Print process list in raw JSON					| `unzip -l mydata.zip`								|
| `tar -ztvf {.tar.gz}`<br/>`tar -jtvf {.tbz2}`	| Print process list in beautified JSON				| `tar -ztvf pics.tar.gz`<br/>`tar -jtvf data.tbz2`	|
